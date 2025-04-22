// import {
//   googleFonts,
//   Options as GoogleFontsOptions,
// } from "lume/plugins/google_fonts.ts";
import { date, Options as DateOptions } from "lume/plugins/date.ts";
import { remark, Options as RemarkOptions } from "lume/plugins/remark.ts";
import remarkGfm from "npm:remark-gfm@4";
import remarkCjkFriendly from "npm:remark-cjk-friendly@1";
import remarkCjkFriendlyGfmStrikethrough from "npm:remark-cjk-friendly-gfm-strikethrough@1";
// import remarkToc from "npm:remark-toc@9";
import rehypeRaw from "npm:rehype-raw@7";
// import rehypeSanitize from "npm:rehype-sanitize@6";
// import rehypeSlug from "npm:rehype-slug@6";
// import rehypeAutolinkHeadings from "npm:rehype-autolink-headings@7";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import metas from "lume/plugins/metas.ts";
import { sitemap, Options as SitemapOptions } from "lume/plugins/sitemap.ts";
import { feed, Options as FeedOptions } from "lume/plugins/feed.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";
import {
  tailwindCSS,
  Options as TailwindCSSOptions,
} from "lume/plugins/tailwindcss.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  // googleFonts?: Partial<GoogleFontsOptions>;
  sitemap?: Partial<SitemapOptions>;
  date?: Partial<DateOptions>;
  feed?: Partial<FeedOptions>;
  favicon?: Partial<FaviconOptions>;
  remark?: Partial<RemarkOptions>;
  tailwindCSS?: Partial<TailwindCSSOptions>;
}

export const defaults: Options = {
  feed: {
    output: ["/feed.xml", "/feed.json"],
    query: "type=post",
    info: {
      title: "=metas.site",
      description: "=metas.description",
    },
    items: {
      title: "=title",
    },
  },
  favicon: {
    input: "uploads/favicon.svg",
  },
  remark: {
    remarkPlugins: [
      remarkGfm,
      remarkCjkFriendly,
      remarkCjkFriendlyGfmStrikethrough,
      // remarkToc,
    ],
    rehypePlugins: [
      rehypeRaw,
      // rehypeSanitize,
      // rehypeSlug,
      // rehypeAutolinkHeading,
    ],
  },
  // googleFonts: {
  //   fonts: {
  //     "Roboto Serif": "https://fonts.google.com/share?selection.family=Roboto+Serif:ital,opsz,wdth,wght,GRAD@0,8..144,87.5,100..900,50;1,8..144,87.5,100..900,50"
  //   }
  // }
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      // .use(googleFonts(options.googleFonts as GoogleFontsOptions))
      .use(resolveUrls())
      .use(slugifyUrls())
      .use(remark(options.remark))
      .use(basePath())
      .use(date(options.date))
      .use(metas())
      .use(sitemap(options.sitemap))
      .use(feed(options.feed))
      .use(favicon(options.favicon))
      .use(tailwindCSS(options.tailwindCSS))
      .use(minifyHTML())
      .use(lightningCss())
      .add("style.css")
      .add("uploads");
  };
}
