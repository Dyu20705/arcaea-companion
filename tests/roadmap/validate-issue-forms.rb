#!/usr/bin/env ruby
# frozen_string_literal: true

require "json"
require "pathname"
require "set"
require "yaml"

class ValidationError < StandardError; end

SUPPORTED_TYPES = Set.new(%w[checkboxes dropdown input markdown textarea upload]).freeze
ID_PATTERN = /\A[A-Za-z0-9_-]+\z/

FORM_CONTRACTS = {
  "bug_report.yml" => {
    title: "[Bug] ",
    labels: %w[type:bug status:needs-triage],
    fields: {
      "preflight" => { type: "checkboxes", required_options: true },
      "area" => { type: "dropdown", required: true },
      "impact" => { type: "textarea", required: true },
      "current-behavior" => { type: "textarea", required: true },
      "expected-behavior" => { type: "textarea", required: true },
      "reproduction" => { type: "textarea", required: true },
      "environment" => { type: "textarea", required: true },
      "source-evidence" => { type: "textarea", required: true }
    }
  },
  "feature_request.yml" => {
    title: "[Proposal] ",
    labels: %w[type:feature status:needs-triage],
    fields: {
      "preflight" => { type: "checkboxes", required_options: true },
      "user-problem" => { type: "textarea", required: true },
      "impact" => { type: "textarea", required: true },
      "roadmap-fit" => { type: "dropdown", required: true },
      "area" => { type: "dropdown", required: true },
      "proposal" => { type: "textarea", required: true },
      "scope" => { type: "textarea", required: true },
      "non-goals" => { type: "textarea", required: true },
      "acceptance-criteria" => { type: "textarea", required: true },
      "dependencies" => { type: "textarea", required: true },
      "data-legal" => { type: "textarea", required: true },
      "ux-quality" => { type: "textarea", required: true },
      "alternatives" => { type: "textarea", required: true }
    }
  },
  "data_correction.yml" => {
    title: "[Data correction] ",
    labels: %w[type:docs area:data area:content status:needs-triage],
    fields: {
      "preflight" => { type: "checkboxes", required_options: true },
      "entity-type" => { type: "dropdown", required: true },
      "entity-id" => { type: "input", required: true },
      "current-value" => { type: "textarea", required: true },
      "proposed-value" => { type: "textarea", required: true },
      "source-evidence" => { type: "textarea", required: true },
      "version-impact" => { type: "textarea", required: true },
      "validation" => { type: "textarea", required: true }
    }
  },
  "research_design.yml" => {
    title: "[Research/Design] ",
    labels: %w[status:needs-triage],
    fields: {
      "preflight" => { type: "checkboxes", required_options: true },
      "work-type" => { type: "dropdown", required: true },
      "question" => { type: "textarea", required: true },
      "context" => { type: "textarea", required: true },
      "constraints" => { type: "textarea", required: true },
      "evidence-plan" => { type: "textarea", required: true },
      "alternatives" => { type: "textarea", required: true },
      "decision-output" => { type: "textarea", required: true },
      "acceptance-criteria" => { type: "textarea", required: true },
      "handoff" => { type: "textarea", required: true },
      "risks" => { type: "textarea", required: true }
    }
  },
  "accessibility_report.yml" => {
    title: "[A11y] ",
    labels: %w[type:bug area:accessibility status:needs-triage],
    fields: {
      "preflight" => { type: "checkboxes", required_options: true },
      "barrier-type" => { type: "dropdown", required: true },
      "user-task" => { type: "textarea", required: true },
      "reproduction" => { type: "textarea", required: true },
      "expected-behavior" => { type: "textarea", required: true },
      "actual-behavior" => { type: "textarea", required: true },
      "environment" => { type: "textarea", required: true },
      "assistive-technology" => { type: "textarea", required: true },
      "workaround" => { type: "textarea", required: true }
    }
  }
}.freeze


def fail_validation!(source, message)
  raise ValidationError, "#{source}: #{message}"
end


def parse_yaml(text, source)
  value = YAML.safe_load(text, permitted_classes: [], permitted_symbols: [], aliases: false)
  fail_validation!(source, "document must contain a mapping") unless value.is_a?(Hash)

  value
rescue Psych::Exception => e
  fail_validation!(source, "invalid YAML: #{e.message.lines.first.strip}")
end


def read_yaml(path)
  parse_yaml(path.read, path.to_s)
rescue Errno::ENOENT
  fail_validation!(path, "file is missing")
end


def non_empty_string?(value)
  value.is_a?(String) && !value.strip.empty?
end


def validate_element_schema!(element, source)
  fail_validation!(source, "every body element must be a mapping") unless element.is_a?(Hash)

  type = element["type"]
  fail_validation!(source, "unsupported or missing element type: #{type.inspect}") unless SUPPORTED_TYPES.include?(type)

  attributes = element["attributes"]
  fail_validation!(source, "#{type} element must define attributes") unless attributes.is_a?(Hash)

  if type == "markdown"
    fail_validation!(source, "markdown elements must not define an id") if element.key?("id")
    fail_validation!(source, "markdown elements require a non-empty attributes.value") unless non_empty_string?(attributes["value"])
    return
  end

  id = element["id"]
  fail_validation!(source, "#{type} element requires a valid id") unless non_empty_string?(id) && ID_PATTERN.match?(id)
  fail_validation!(source, "field #{id.inspect} requires a non-empty attributes.label") unless non_empty_string?(attributes["label"])

  validations = element.fetch("validations", {})
  fail_validation!(source, "field #{id.inspect} validations must be a mapping") unless validations.is_a?(Hash)
  if validations.key?("required") && ![true, false].include?(validations["required"])
    fail_validation!(source, "field #{id.inspect} validations.required must be boolean")
  end

  case type
  when "dropdown"
    options = attributes["options"]
    unless options.is_a?(Array) && !options.empty? && options.all? { |option| non_empty_string?(option) }
      fail_validation!(source, "dropdown #{id.inspect} requires non-empty string options")
    end
    fail_validation!(source, "dropdown #{id.inspect} options must be unique") unless options.uniq.length == options.length
  when "checkboxes"
    options = attributes["options"]
    unless options.is_a?(Array) && !options.empty? && options.all? { |option| option.is_a?(Hash) && non_empty_string?(option["label"]) }
      fail_validation!(source, "checkboxes #{id.inspect} require labeled option mappings")
    end
    labels = options.map { |option| option["label"] }
    fail_validation!(source, "checkboxes #{id.inspect} option labels must be unique") unless labels.uniq.length == labels.length
    options.each do |option|
      next unless option.key?("required")
      fail_validation!(source, "checkbox option required must be boolean") unless [true, false].include?(option["required"])
    end
  when "upload"
    accept = validations["accept"]
    if validations.key?("accept") && !non_empty_string?(accept)
      fail_validation!(source, "upload #{id.inspect} validations.accept must be a non-empty string")
    end
  end
end


def validate_form!(document, contract, source, available_labels)
  %w[name description title].each do |key|
    fail_validation!(source, "top-level #{key} must be a non-empty string") unless non_empty_string?(document[key])
  end
  fail_validation!(source, "top-level name must be longer than three characters") unless document["name"].strip.length > 3
  fail_validation!(source, "unexpected title prefix #{document['title'].inspect}") unless document["title"] == contract.fetch(:title)

  labels = document["labels"]
  unless labels.is_a?(Array) && labels.all? { |label| non_empty_string?(label) }
    fail_validation!(source, "top-level labels must be an array of non-empty strings")
  end
  fail_validation!(source, "top-level labels must be unique") unless labels.uniq.length == labels.length
  expected_labels = contract.fetch(:labels)
  unless labels.sort == expected_labels.sort
    fail_validation!(source, "labels #{labels.inspect} do not match expected #{expected_labels.inspect}")
  end
  missing_labels = labels.reject { |label| available_labels.include?(label) }
  fail_validation!(source, "labels are not declared in roadmap/labels.json: #{missing_labels.join(', ')}") unless missing_labels.empty?

  body = document["body"]
  fail_validation!(source, "top-level body must be a non-empty array") unless body.is_a?(Array) && !body.empty?
  body.each { |element| validate_element_schema!(element, source) }

  fields = body.filter_map { |element| element["id"] && [element["id"], element] }.to_h
  ids = body.filter_map { |element| element["id"] }
  fail_validation!(source, "field ids must be unique") unless ids.uniq.length == ids.length

  contract.fetch(:fields).each do |id, expected|
    element = fields[id]
    fail_validation!(source, "missing required field #{id.inspect}") unless element
    unless element["type"] == expected.fetch(:type)
      fail_validation!(source, "field #{id.inspect} must use type #{expected.fetch(:type).inspect}")
    end
    if expected[:required] && element.dig("validations", "required") != true
      fail_validation!(source, "field #{id.inspect} must set validations.required: true")
    end
    next unless expected[:required_options]

    options = element.dig("attributes", "options")
    unless options.is_a?(Array) && options.all? { |option| option["required"] == true }
      fail_validation!(source, "field #{id.inspect} must require every checkbox option")
    end
  end
end


def validate_config!(document, source)
  unless document["blank_issues_enabled"] == false
    fail_validation!(source, "blank_issues_enabled must remain false")
  end
  if document.key?("contact_links") && !document["contact_links"].is_a?(Array)
    fail_validation!(source, "contact_links must be an array when present")
  end
end


def deep_copy(value)
  Marshal.load(Marshal.dump(value))
end


def expect_failure!(name)
  yield
  raise ValidationError, "self-test #{name.inspect} did not fail"
rescue ValidationError
  nil
end


def run_self_tests!(documents, available_labels)
  contract = FORM_CONTRACTS.fetch("bug_report.yml")
  source = "self-test/bug_report.yml"

  required_false = deep_copy(documents.fetch("bug_report.yml"))
  required_false["body"].find { |field| field["id"] == "reproduction" }["validations"]["required"] = false
  expect_failure!("required field becomes optional") { validate_form!(required_false, contract, source, available_labels) }

  wrong_type = deep_copy(documents.fetch("bug_report.yml"))
  wrong_type["body"].find { |field| field["id"] == "reproduction" }["type"] = "input"
  expect_failure!("required field changes type") { validate_form!(wrong_type, contract, source, available_labels) }

  duplicate_id = deep_copy(documents.fetch("bug_report.yml"))
  duplicate_id["body"] << deep_copy(duplicate_id["body"].find { |field| field["id"] == "reproduction" })
  expect_failure!("duplicate field id") { validate_form!(duplicate_id, contract, source, available_labels) }

  wrong_title = deep_copy(documents.fetch("bug_report.yml"))
  wrong_title["title"] = "[Defect] "
  expect_failure!("unexpected title prefix") { validate_form!(wrong_title, contract, source, available_labels) }

  wrong_labels = deep_copy(documents.fetch("bug_report.yml"))
  wrong_labels["labels"] = ["type:bug"]
  expect_failure!("missing default label") { validate_form!(wrong_labels, contract, source, available_labels) }

  expect_failure!("malformed YAML") { parse_yaml("body:\n  - type: [", "self-test/malformed.yml") }
end

root = Pathname.new(ARGV.fetch(0, File.expand_path("../..", __dir__))).expand_path
labels_path = root.join("roadmap/labels.json")
forms_dir = root.join(".github/ISSUE_TEMPLATE")

begin
  labels_document = JSON.parse(labels_path.read)
  available_labels = Set.new(labels_document.fetch("labels").map { |label| label.fetch("name") })

  documents = {}
  FORM_CONTRACTS.each do |filename, contract|
    path = forms_dir.join(filename)
    document = read_yaml(path)
    validate_form!(document, contract, path.to_s, available_labels)
    documents[filename] = document
  end

  config_path = forms_dir.join("config.yml")
  validate_config!(read_yaml(config_path), config_path.to_s)
  run_self_tests!(documents, available_labels)

  puts "Issue form YAML schemas and repository contracts passed."
rescue JSON::ParserError, KeyError => e
  warn "FAIL: issue-form validator configuration is invalid: #{e.message}"
  exit 1
rescue ValidationError => e
  warn "FAIL: #{e.message}"
  exit 1
rescue Errno::ENOENT => e
  warn "FAIL: missing validation input: #{e.message}"
  exit 1
end
