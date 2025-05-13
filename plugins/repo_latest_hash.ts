import Site from "lume/core/site.ts";
import { getRepoLatestCommitHash } from "../utils/git.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  hashesKey?: string;
  repoKey?: string;
}

export const defaults: Options = {
  hashesKey: "hashes",
  repoKey: "repo",
};

/**
 * A plugin to set repository's latest commit hash on all pages
 */
export function repoLatestHash(userOptions?: Options) {
  const options = merge(defaults, userOptions);
  return (site: Site) => {
    site.mergeKey(options.hashesKey, "object");
    const hash = getRepoLatestCommitHash();
    site.data(options.hashesKey, { [options.repoKey]: hash?.long });
  };
}

export default repoLatestHash;
