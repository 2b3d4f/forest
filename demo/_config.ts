import lume from "lume/mod.ts";
import theme from "theme/mod.ts";
import gitData from "../plugins/git_data.ts";

const site = lume();

site
  .use(
    theme({
      prism: {
        theme: {
          name: "okaidia",
          cssFile: "prism.css",
        },
      },
    })
  )
  .use(gitData());

export default site;
