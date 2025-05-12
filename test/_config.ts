import lume from "lume/mod.ts";
import theme from "theme/mod.ts";

import gitDates from "../plugins/git_dates.ts";
import gitHashes from "../plugins/git_hashes.ts";
import repoLatestHash from "../plugins/repo_latest_hash.ts";

const site = lume();

site
  .use(
    theme({
      googleFonts: {
        fonts: {
          display:
            "https://fonts.google.com/share?selection.family=Libre+Baskerville:ital,wght@0,400;0,700;1,400",
          text: "https://fonts.google.com/share?selection.family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700",
        },
      },
      fonts: {
        fallback: {
          display: "serif",
          text: "serif",
        },
      },
      prism: {
        theme: {
          name: "okaidia",
          cssFile: "prism.css",
        },
      },
    })
  )
  .use(repoLatestHash())
  .use(gitHashes())
  .use(gitDates());

export default site;
