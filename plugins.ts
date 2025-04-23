import gitData from "./plugins/git_data.ts";
import {
  googleFonts,
  Options as GoogleFontsOptions,
} from "lume/plugins/google_fonts.ts";
import { date, Options as DateOptions } from "lume/plugins/date.ts";
import {
  addRemarkToc,
  Options as AddRemarkTocOptions,
} from "./plugins/add_remark_toc.ts";
import { remark, Options as RemarkOptions } from "lume/plugins/remark.ts";
import { prism, Options as PrismOptions } from "lume/plugins/prism.ts";
import remarkGfm from "npm:remark-gfm@4";
import remarkCjkFriendly from "npm:remark-cjk-friendly@1";
import remarkCjkFriendlyGfmStrikethrough from "npm:remark-cjk-friendly-gfm-strikethrough@1";
import remarkToc from "npm:remark-toc@9";
import rehypeRaw from "npm:rehype-raw@7";
// import rehypeSanitize from "npm:rehype-sanitize@6";
import rehypeSlug from "npm:rehype-slug@6";
import rehypeAutolinkHeadings from "npm:rehype-autolink-headings@7";
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

const FallbackFonts = {
  Serif: "serif",
  Sans: "sans",
} as const;

type FallbackFonts = (typeof FallbackFonts)[keyof typeof FallbackFonts];

interface FontsOptions {
  fallback?: {
    display?: FallbackFonts;
    text?: FallbackFonts;
  };
}

export interface Options {
  googleFonts?: Partial<GoogleFontsOptions>;
  sitemap?: Partial<SitemapOptions>;
  date?: Partial<DateOptions>;
  feed?: Partial<FeedOptions>;
  favicon?: Partial<FaviconOptions>;
  remark?: Partial<RemarkOptions>;
  tailwindCSS?: Partial<TailwindCSSOptions>;
  prism?: Partial<PrismOptions>;
  fonts?: Partial<FontsOptions>;
  addToc?: Partial<AddRemarkTocOptions>;
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
      remarkToc,
    ],
    rehypePlugins: [
      rehypeRaw,
      // rehypeSanitize, //Sanitize breaks footnotes
      rehypeSlug,
      rehypeAutolinkHeadings,
    ],
  },
  googleFonts: {
    fonts: {
      // display:
      //   "https://fonts.google.com/share?selection.family=Libre+Baskerville:ital,wght@0,400;0,700;1,400",
      // text: "https://fonts.google.com/share?selection.family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700",
      display:
        "https://fonts.google.com/share?selection.family=Poppins:ital,wght@0,400;0,700;1,400;1,700",
      text: "https://fonts.google.com/share?selection.family=Roboto:ital,wght@0,100..900;1,100..900",
    },
  },
  fonts: {
    fallback: {
      display: "sans",
      text: "sans",
    },
  },
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site.data("fonts", options.fonts);

    site
      .use(gitData())
      .use(addRemarkToc(options.addToc))
      .use(
        googleFonts({
          cssFile: "style.css",
          placeholder: "/* google-fonts-placeholder */",
          fonts: options.googleFonts.fonts,
        } as GoogleFontsOptions)
      )
      .use(resolveUrls())
      .use(slugifyUrls())
      .use(remark(options.remark))
      .use(basePath())
      .use(date(options.date))
      .use(metas())
      .use(prism(options.prism))
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
