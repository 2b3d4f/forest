import type Site from "lume/core/site.ts";
import { Extensions } from "lume/core/utils/path.ts";
import { getGitCommitHash } from "../utils/git.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extensions?: Extensions;
  hashesKey?: string;
  createdKey?: string;
  modifiedKey?: string;
}

export const defaults: Options = {
  extensions: [".html"],
  hashesKey: "hashes",
  createdKey: "created",
  modifiedKey: "modified",
};

export function gitHashes(userOptions?: Options) {
  const options = merge(defaults, userOptions);
  return (site: Site) => {
    site.preprocess(options.extensions, (pages) => {
      for (const page of pages) {
        const entry = page.src.entry;
        if (!entry) continue;
        const file = entry.src;

        page.data[options.hashesKey] ??= {};

        // first commit
        const created = getGitCommitHash("created", file);
        if (created)
          page.data[options.hashesKey][options.createdKey] ??= created.long;

        // last modified
        const modified = getGitCommitHash("modified", file);
        if (modified)
          page.data[options.hashesKey][options.modifiedKey] ??= modified.long;
      }
    });
  };
}

export default gitHashes;
