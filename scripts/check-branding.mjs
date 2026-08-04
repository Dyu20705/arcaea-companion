import { execFileSync } from "node:child_process";

const forbiddenPatterns = [
  { label: "old repository slug", pattern: "arcaea-viewer" },
  { label: "old product name", pattern: "Arcaea Viewer" },
  { label: "old design-token namespace", pattern: "--av-" },
  { label: "old component class namespace", pattern: ".av-" },
];

const findings = [];

for (const { label, pattern } of forbiddenPatterns) {
  try {
    const output = execFileSync(
      "git",
      ["grep", "-nI", "-F", "-e", pattern, "--", "."],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    ).trim();

    if (output) {
      findings.push(`${label} (${pattern}):\n${output}`);
    }
  } catch (error) {
    if (error && typeof error === "object" && "status" in error && error.status === 1) {
      continue;
    }

    throw error;
  }
}

if (findings.length > 0) {
  console.error("Legacy Arcaea Viewer branding remains in tracked files:\n");
  console.error(findings.join("\n\n"));
  process.exit(1);
}

console.log("Branding guard passed: no legacy Arcaea Viewer identifiers found.");
