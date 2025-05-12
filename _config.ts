import lume from "lume/mod.ts";
import plugins from "./plugins.ts";
import repoLatestHash from "./plugins/repo_latest_hash.ts";
import gitDates from "./plugins/git_dates.ts";
import gitHashes from "./plugins/git_hashes.ts";

const site = lume({
  src: "./src",
});

site
  .use(
    plugins({
      prism: {
        theme: {
          name: "okaidia",
          cssFile: "prism.css",
        },
      },
    })
  )
  .use(repoLatestHash())
  .use(gitDates())
  .use(gitHashes());

export default site;
