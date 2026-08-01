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
    title: "[Bug] ", labels: %w[type:bug status:needs-triage],
    fields: {
      "preflight" => ["checkboxes", :required_options], "area" => ["dropdown", :required],
      "impact" => ["textarea", :required], "current-behavior" => ["textarea", :required],
      "expected-behavior" => ["textarea", :required], "reproduction" => ["textarea", :required],
      "environment" => ["textarea", :required], "source-evidence" => ["textarea", :required]
    }
  },
  "feature_request.yml" => {
    title: "[Proposal] ", labels: %w[type:feature status:needs-triage],
    fields: {
      "preflight" => ["checkboxes", :required_options], "user-problem" => ["textarea", :required],
      "impact" => ["textarea", :required], "roadmap-fit" => ["dropdown", :required],
      "area" => ["dropdown", :required], "proposal" => ["textarea", :required],
      "scope" => ["textarea", :required], "non-goals" => ["textarea", :required],
      "acceptance-criteria" => ["textarea", :required], "dependencies" => ["textarea", :required],
      "data-legal" => ["textarea", :required], "ux-quality" => ["textarea", :required],
      "alternatives" => ["textarea", :required]
    }
  },
  "data_correction.yml" => {
    title: "[Data correction] ", labels: %w[type:docs area:data area:content status:needs-triage],
    fields: {
      "preflight" => ["checkboxes", :required_options], "entity-type" => ["dropdown", :required],
      "entity-id" => ["input", :required], "current-value" => ["textarea", :required],
      "proposed-value" => ["textarea", :required], "source-evidence" => ["textarea", :required],
      "version-impact" => ["textarea", :required], "validation" => ["textarea", :required]
    }
  },
  "research_design.yml" => {
    title: "[Research/Design] ", labels: %w[status:needs-triage],
    fields: {
      "preflight" => ["checkboxes", :required_options], "work-type" => ["dropdown", :required],
      "question" => ["textarea", :required], "context" => ["textarea", :required],
      "constraints" => ["textarea", :required], "evidence-plan" => ["textarea", :required],
      "alternatives" => ["textarea", :required], "decision-output" => ["textarea", :required],
      "acceptance-criteria" => ["textarea", :required], "handoff" => ["textarea", :required],
      "risks" => ["textarea", :required]
    }
  },
  "accessibility_report.yml" => {
    title: "[A11y] ", labels: %w[type:bug area:accessibility status:needs-triage],
    fields: {
      "preflight" => ["checkboxes", :required_options], "barrier-type" => ["dropdown", :required],
      "user-task" => ["textarea", :required], "reproduction" => ["textarea", :required],
      "expected-behavior" => ["textarea", :required], "actual-behavior" => ["textarea", :required],
      "environment" => ["textarea", :required], "assistive-technology" => ["textarea", :required],
      "workaround" => ["textarea", :required]
    }
  }
}.freeze

def reject!(source, message)
  raise ValidationError, "#{source}: #{message}"
end

def text?(value)
  value.is_a?(String) && !value.strip.empty?
end

def parse_yaml(text, source)
  document = YAML.safe_load(text, permitted_classes: [], permitted_symbols: [], aliases: false)
  reject!(source, "document must contain a mapping") unless document.is_a?(Hash)
  document
rescue Psych::Exception => e
  reject!(source, "invalid YAML: #{e.message.lines.first.strip}")
end

def load_yaml(path)
  parse_yaml(path.read, path.to_s)
rescue Errno::ENOENT
  reject!(path, "file is missing")
end

def validate_element!(element, source)
  reject!(source, "every body element must be a mapping") unless element.is_a?(Hash)
  type = element["type"]
  reject!(source, "unsupported or missing element type #{type.inspect}") unless SUPPORTED_TYPES.include?(type)
  attributes = element["attributes"]
  reject!(source, "#{type} element must define attributes") unless attributes.is_a?(Hash)

  if type == "markdown"
    reject!(source, "markdown elements must not define an id") if element.key?("id")
    reject!(source, "markdown requires non-empty attributes.value") unless text?(attributes["value"])
    return
  end

  id = element["id"]
  reject!(source, "#{type} element requires a valid id") unless text?(id) && ID_PATTERN.match?(id)
  reject!(source, "field #{id.inspect} requires attributes.label") unless text?(attributes["label"])
  validations = element.fetch("validations", {})
  reject!(source, "field #{id.inspect} validations must be a mapping") unless validations.is_a?(Hash)
  if validations.key?("required") && ![true, false].include?(validations["required"])
    reject!(source, "field #{id.inspect} validations.required must be boolean")
  end

  if type == "dropdown"
    options = attributes["options"]
    valid = options.is_a?(Array) && !options.empty? && options.all? { |option| text?(option) }
    reject!(source, "dropdown #{id.inspect} requires non-empty string options") unless valid
    reject!(source, "dropdown #{id.inspect} options must be unique") unless options.uniq.length == options.length
  elsif type == "checkboxes"
    options = attributes["options"]
    valid = options.is_a?(Array) && !options.empty? && options.all? { |option| option.is_a?(Hash) && text?(option["label"]) }
    reject!(source, "checkboxes #{id.inspect} require labeled option mappings") unless valid
    labels = options.map { |option| option["label"] }
    reject!(source, "checkboxes #{id.inspect} option labels must be unique") unless labels.uniq.length == labels.length
    options.each do |option|
      next unless option.key?("required")
      reject!(source, "checkbox option required must be boolean") unless [true, false].include?(option["required"])
    end
  elsif type == "upload" && validations.key?("accept") && !text?(validations["accept"])
    reject!(source, "upload #{id.inspect} validations.accept must be a non-empty string")
  end
end

def validate_form!(document, contract, source, available_labels)
  %w[name description title].each do |key|
    reject!(source, "top-level #{key} must be a non-empty string") unless text?(document[key])
  end
  reject!(source, "top-level name must be longer than three characters") unless document["name"].strip.length > 3
  reject!(source, "unexpected title prefix #{document['title'].inspect}") unless document["title"] == contract[:title]

  labels = document["labels"]
  valid_labels = labels.is_a?(Array) && labels.all? { |label| text?(label) }
  reject!(source, "top-level labels must be an array of non-empty strings") unless valid_labels
  reject!(source, "top-level labels must be unique") unless labels.uniq.length == labels.length
  reject!(source, "labels #{labels.inspect} do not match expected #{contract[:labels].inspect}") unless labels.sort == contract[:labels].sort
  undeclared = labels.reject { |label| available_labels.include?(label) }
  reject!(source, "undeclared labels: #{undeclared.join(', ')}") unless undeclared.empty?

  body = document["body"]
  reject!(source, "top-level body must be a non-empty array") unless body.is_a?(Array) && !body.empty?
  body.each { |element| validate_element!(element, source) }
  ids = body.filter_map { |element| element["id"] }
  reject!(source, "field ids must be unique") unless ids.uniq.length == ids.length
  fields = body.filter_map { |element| element["id"] && [element["id"], element] }.to_h

  contract[:fields].each do |id, (type, rule)|
    field = fields[id]
    reject!(source, "missing required field #{id.inspect}") unless field
    reject!(source, "field #{id.inspect} must use type #{type.inspect}") unless field["type"] == type
    if rule == :required
      reject!(source, "field #{id.inspect} must set validations.required: true") unless field.dig("validations", "required") == true
    else
      options = field.dig("attributes", "options")
      valid = options.is_a?(Array) && options.all? { |option| option["required"] == true }
      reject!(source, "field #{id.inspect} must require every checkbox option") unless valid
    end
  end
end

def validate_config!(document, source)
  reject!(source, "blank_issues_enabled must remain false") unless document["blank_issues_enabled"] == false
  if document.key?("contact_links") && !document["contact_links"].is_a?(Array)
    reject!(source, "contact_links must be an array when present")
  end
end

def copy(value)
  Marshal.load(Marshal.dump(value))
end

def expect_failure!(name)
  failed = false
  begin
    yield
  rescue ValidationError
    failed = true
  end
  raise ValidationError, "self-test #{name.inspect} did not fail" unless failed
end

def run_self_tests!(documents, available_labels)
  contract = FORM_CONTRACTS.fetch("bug_report.yml")
  source = "self-test/bug_report.yml"

  optional = copy(documents.fetch("bug_report.yml"))
  optional["body"].find { |field| field["id"] == "reproduction" }["validations"]["required"] = false
  expect_failure!("required false") { validate_form!(optional, contract, source, available_labels) }

  wrong_type = copy(documents.fetch("bug_report.yml"))
  wrong_type["body"].find { |field| field["id"] == "reproduction" }["type"] = "input"
  expect_failure!("wrong type") { validate_form!(wrong_type, contract, source, available_labels) }

  duplicate = copy(documents.fetch("bug_report.yml"))
  duplicate["body"] << copy(duplicate["body"].find { |field| field["id"] == "reproduction" })
  expect_failure!("duplicate id") { validate_form!(duplicate, contract, source, available_labels) }

  wrong_title = copy(documents.fetch("bug_report.yml"))
  wrong_title["title"] = "[Defect] "
  expect_failure!("wrong title") { validate_form!(wrong_title, contract, source, available_labels) }

  wrong_labels = copy(documents.fetch("bug_report.yml"))
  wrong_labels["labels"] = ["type:bug"]
  expect_failure!("wrong labels") { validate_form!(wrong_labels, contract, source, available_labels) }

  expect_failure!("malformed YAML") { parse_yaml("body:\n  - type: [", "self-test/malformed.yml") }
end

root = Pathname.new(ARGV.fetch(0, File.expand_path("../..", __dir__))).expand_path
forms_dir = root.join(".github/ISSUE_TEMPLATE")

begin
  label_data = JSON.parse(root.join("roadmap/labels.json").read)
  available_labels = Set.new(label_data.fetch("labels").map { |label| label.fetch("name") })
  documents = {}

  FORM_CONTRACTS.each do |filename, contract|
    path = forms_dir.join(filename)
    documents[filename] = load_yaml(path)
    validate_form!(documents[filename], contract, path.to_s, available_labels)
  end

  config_path = forms_dir.join("config.yml")
  validate_config!(load_yaml(config_path), config_path.to_s)
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
