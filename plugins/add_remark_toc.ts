import Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";
import { log } from "lume/core/utils/log.ts";
import { Extensions } from "lume/core/utils/path.ts";

export interface Options {
  extentions?: Extensions;
  placeholder?: RegExp;
  text?: string;
}

export const defaults: Options = {
  extentions: [".md"],
  placeholder: /<!-- toc -->/g,
  text: "## Table of Contents",
};

function replacePlaceholder(content: string, userOptions: Options): string {
  const options = merge(defaults, userOptions);
  const tocHeader = `${options.text}`;
  return content.replace(options.placeholder, tocHeader);
}

function toValidHtmlId(input: string): string {
  if (!input.trim()) return "id";

  return input
    .normalize("NFKD")
    .replace(/\p{Cc}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\-_:.]/g, "")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function addRemarkToc(userOptions: Options) {
  const options = merge(defaults, userOptions);
  return (site: Site) => {
    site.preprocess(options.extentions, (pages) => {
      for (const page of pages) {
        try {
          page.data.content = replacePlaceholder(
            page.data.content as string,
            options
          );
        } catch (error) {
          log.error(
            `[add-remark-toc plugin] Error replacing ${page.sourcePath}: ${error}`
          );
        }
      }
    });
    site.process([".html"], (pages) => {
      for (const page of pages) {
        try {
          for (const tocHeader of page.document.querySelectorAll(
            `.prose > #${toValidHtmlId(options.text.trim())}`
          )) {
            const wrapper = page.document.createElement("div");
            const sibling = tocHeader.nextElementSibling;

            wrapper.classList.add("table-of-contents");
            tocHeader.parentNode?.insertBefore(wrapper, tocHeader);

            wrapper.appendChild(tocHeader);
            if (sibling) {
              wrapper.appendChild(sibling);
            }
          }
        } catch (error) {
          log.error(`[add-remark-toc plugin] Error wrapping ToC in ${page.sourcePath}: ${error}`)
        }
      }
    });
  };
}

export default addRemarkToc;
