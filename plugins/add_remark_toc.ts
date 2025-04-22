import Site from "lume/core/site.ts";
import { merge } from "lume/core/utils/object.ts";
import { log } from "lume/core/utils/log.ts";

export interface Options {
  placeholder?: RegExp;
  text?: string;
}

export const defaults: Options = {
  placeholder: /<!-- toc -->/g,
  text: "## Table of Contents",
};

function replaceText(content: string, userOptions: Options): string {
  const options = merge(defaults, userOptions);
  const tocHeader = `${options.text}`;
  return content.replace(options.placeholder, tocHeader);
}

export function addRemarkToc(userOptions: Options) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.preprocess([".md"], (pages) => {
      for (const page of pages) {
        try {
          page.data.content = replaceText(page.data.content as string, options);
        } catch (error) {
          log.error(
            `[add-toc plugin] Error replacing ${page.sourcePath}: ${error}`
          );
        }
      }
    });
  };
}

export default addRemarkToc;
