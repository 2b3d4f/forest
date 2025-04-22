import lume from "lume/mod.ts";
import plugins from "./plugins.ts";

const site = lume({
  src: "./src",
});

site.use(plugins({
  prism: {
    theme: {
      name: "okaidia",
      cssFile: "prism.css"
    }
  },
}));

export default site;
