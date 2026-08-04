import { spawnSync } from "node:child_process";

const forbiddenPatterns = [
  { label: "old repository slug", pattern: ["arcaea", "viewer"].join("-") },
  { label: "old product name", pattern: ["Arcaea", "Viewer"].join(" ") },
  { label: "old design-token namespace", pattern: ["--", "av", "-"].join("") },
  { label: "old component class namespace", pattern: [".", "av", "-"].join("") },
];

const findings = [];

for (const { label, pattern } of forbiddenPatterns) {
  const result = spawnSync(
    "git",
    ["grep", "-nI", "-F", "-e", pattern, "--", "."],
    { encoding: "utf8" },
  );

  if (result.status === 0 && result.stdout.trim()) {
    findings.push(`${label} (${pattern}):\n${result.stdout.trim()}`);
    continue;
  }

  if (result.status !== 1) {
    throw new Error(
      `Branding search failed for ${label}: ${result.stderr.trim() || `exit ${result.status}`}`,
    );
  }
}

if (findings.length > 0) {
  console.error("Legacy branding remains in tracked files:\n");
  console.error(findings.join("\n\n"));
  process.exit(1);
}

console.log("Branding guard passed: no legacy identifiers found.");
