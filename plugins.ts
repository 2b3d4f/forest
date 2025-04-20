import { remark, Options as RemarkOptions } from "lume/plugins/remark.ts";
import remarkGfm from "npm:remark-gfm@4";
import remarkCjkFriendly from "npm:remark-cjk-friendly@1";
import remarkCjkFriendlyGfmStrikethrough from "npm:remark-cjk-friendly-gfm-strikethrough@1";
import rehypeRaw from "npm:rehype-raw@7";
import rehypeSanitize from "npm:rehype-sanitize@6";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import { Options as SitemapOptions, sitemap } from "lume/plugins/sitemap.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";
import { tailwindCSS, Options as TailwindCSSOptions } from "lume/plugins/tailwindcss.ts";
import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  sitemap?: Partial<SitemapOptions>;
  favicon?: Partial<FaviconOptions>;
  remark?: Partial<RemarkOptions>;
  tailwindCSS?: Partial<TailwindCSSOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "uploads/favicon.svg",
  },
  remark: {
    remarkPlugins: [
      remarkGfm,
      remarkCjkFriendly,
      remarkCjkFriendlyGfmStrikethrough,
    ],
    rehypePlugins: [rehypeRaw, rehypeSanitize],
  },
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(remark(options.remark))
      .use(basePath())
      .use(metas())
      .use(sitemap(options.sitemap))
      .use(favicon(options.favicon))
      .use(tailwindCSS(options.tailwindCSS))
      .add("style.css")
      .add("uploads");
  };
}
