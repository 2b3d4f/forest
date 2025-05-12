import Site from "lume/core/site.ts";
import { Extensions } from "lume/core/utils/path.ts";
import { getRepoLatestCommitHash } from "../utils/git.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extensions?: Extensions;
  hashesKey?: string;
  repoKey?: string;
}

export const defaults: Options = {
  extensions: [".html"],
  hashesKey: "hashes",
  repoKey: "repo",
};

/**
 * A plugin to set repository's latest commit hash on all pages
 */
export function repoLatestHash(userOptions?: Options) {
  const options = merge(defaults, userOptions);
  return (site: Site) => {
    const hash = getRepoLatestCommitHash();
    site.preprocess(options.extensions, (pages) => {
      for (const page of pages) {
        page.data[options.hashesKey] ??= {};

        if (hash) page.data[options.hashesKey][options.repoKey] ??= hash.long;
      }
    });
  };
}

export default repoLatestHash;
