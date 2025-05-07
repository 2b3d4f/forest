// — Lume Plugins
import basePath from "lume/plugins/base_path.ts";
import { date, Options as DateOptions } from "lume/plugins/date.ts";
import { feed, Options as FeedOptions } from "lume/plugins/feed.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";
import {
  googleFonts,
  Options as GoogleFontsOptions,
} from "lume/plugins/google_fonts.ts";
import { metas } from "lume/plugins/metas.ts";
import { prism, Options as PrismOptions } from "lume/plugins/prism.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import { sitemap, Options as SitemapOptions } from "lume/plugins/sitemap.ts";
import {
  tailwindCSS,
  Options as TailwindCSSOptions,
} from "lume/plugins/tailwindcss.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import lightningCss from "lume/plugins/lightningcss.ts";

// — Custom Plugins
import {
  addRemarkToc,
  Options as AddRemarkTocOptions,
} from "./plugins/add_remark_toc.ts";

// — Remark/Rehype
import { remark, Options as RemarkOptions } from "lume/plugins/remark.ts";
import remarkCjkFriendly from "npm:remark-cjk-friendly@1";
import remarkCjkFriendlyGfmStrikethrough from "npm:remark-cjk-friendly-gfm-strikethrough@1";
import remarkToc from "npm:remark-toc@9";
import rehypeAutolinkHeadings from "npm:rehype-autolink-headings@7";
import rehypeSlug from "npm:rehype-slug@6";

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
      remarkCjkFriendly,
      remarkCjkFriendlyGfmStrikethrough,
      remarkToc,
    ],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  },
  googleFonts: {
    fonts: {
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
      // Static files
      .add("style.css")
      .add("uploads")

      .use(date(options.date))
      .use(metas())
      .use(prism(options.prism))
      .use(remark(options.remark))
      .use(addRemarkToc(options.addToc))

      // Style
      .use(
        googleFonts({
          fonts: options.googleFonts.fonts,
        } as GoogleFontsOptions)
      )
      .use(tailwindCSS(options.tailwindCSS))
      .use(lightningCss())

      // URLs
      .use(basePath())
      .use(resolveUrls())
      .use(slugifyUrls())

      .use(favicon(options.favicon))

      // Feed
      .use(feed(options.feed))
      .use(sitemap(options.sitemap))

      .use(minifyHTML());
  };
}
