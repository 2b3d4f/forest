import plugins, { Options } from "./plugins.ts";

import "lume/types.ts";

export type { Options } from "./plugins.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add remote files
    const files = [
      "_includes/layouts/base.vto",
      "_includes/layouts/layout.vto",
      "_includes/layouts/page.vto",
      "_includes/layouts/post.vto",
      "_includes/templates/main.vto",
      "_includes/css/prose_fix.css",
      "uploads/favicon.svg",
      "_data.yml",
      "posts/_data.yml",
      "404.vto",
      "index.vto",
      "style.css",
    ];

    for (const file of files) {
      console.log(file, import.meta.resolve(`./src/${file}`));
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
