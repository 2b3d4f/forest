import Site from "lume/core/site.ts";
import { log } from "lume/core/utils/log.ts";

const longHashCommand = new Deno.Command("git", {
  args: ["show", "--format=%H", "--no-patch"],
  stdout: "piped",
});
const shortHashCommand = new Deno.Command("git", {
  args: ["show", "--format=%h", "--no-patch"],
  stdout: "piped",
});

interface CommitHashes {
  long: string;
  short: string;
}

async function getCommitHash(): Promise<CommitHashes> {
  const outputLong = await longHashCommand.output();
  const outputShort = await shortHashCommand.output();
  const hashLong = new TextDecoder().decode(outputLong.stdout).trim();
  const hashShort = new TextDecoder().decode(outputShort.stdout).trim();
  return {
    long: hashLong,
    short: hashShort,
  };
}

async function setCommitHash(site: Site) {
  const hash = await getCommitHash();
  site.preprocess("*", (pages) => {
    try {
      for (const page of pages) {
        page.data.git = {
          hash: hash,
        };
      }
    } catch (error) {
      log.error(
        `[git-data] Error setting commit hash data to pages: ${error} `
      );
    }
  });
}

/**
 * A plugin to set git data on all pages
 */
export function gitData() {
  return (site: Site) => {
    site.mergeKey("git", "object");
    site.addEventListener("beforeBuild", async () => {
      await setCommitHash(site);
    });
    site.addEventListener("beforeUpdate", async () => {
      await setCommitHash(site);
    });
  };
}

export default gitData;
