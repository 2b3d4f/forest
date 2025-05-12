const DateType = {
  Created: "created",
  Modified: "modified",
} as const;

type DateType = (typeof DateType)[keyof typeof DateType];

export function getGitCommitHash(
  type: DateType,
  file: string
): { long: string; short: string } | undefined {
  const format = "%H%n%h";
  const args =
    type === "created"
      ? [
          "log",
          "--diff-filter=A",
          "--follow",
          "-1",
          `--format=${format}`,
          "--",
          file,
        ]
      : ["log", "-1", `--format=${format}`, "--", file];

  const { stdout, success } = new Deno.Command("git", { args }).outputSync();
  if (!success) {
    return;
  }

  const out = new TextDecoder().decode(stdout).trim();
  if (!out) {
    return;
  }
  const [longHash, shortHash] = out.split("\n");
  return { long: longHash, short: shortHash };
}

export function getRepoLatestCommitHash():
  | { long: string; short: string }
  | undefined {
  const format = "%H%n%h";

  const args = ["show", `--format=${format}`, "--no-patch"];

  const { stdout, success } = new Deno.Command("git", { args }).outputSync();
  if (!success) {
    return;
  }

  const out = new TextDecoder().decode(stdout).trim();
  if (!out) {
    return;
  }
  const [longHash, shortHash] = out.split("\n");
  return { long: longHash, short: shortHash };
}

export function getGitDate(type: DateType, file: string): Date | undefined {
  const format = "%cI";

  const args =
    type === "created"
      ? [
          "log",
          "--diff-filter=A",
          "--follow",
          "-1",
          `--format=${format}`,
          "--",
          file,
        ]
      : ["log", "-1", `--format=${format}`, "--", file];

  const { stdout, success } = new Deno.Command("git", { args }).outputSync();
  if (!success) {
    return;
  }

  const out = new TextDecoder().decode(stdout).trim();
  if (!out) {
    return;
  }

  const date = new Date(out);
  return isNaN(date.getTime()) ? undefined : date;
}
