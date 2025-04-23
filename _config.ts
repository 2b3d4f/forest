import lume from "lume/mod.ts";
import plugins from "./plugins.ts";
import gitData from "./plugins/git_data.ts";

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
  .use(gitData());

export default site;
