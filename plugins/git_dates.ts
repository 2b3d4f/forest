import type Site from "lume/core/site.ts";
import { Extensions } from "lume/core/utils/path.ts";
import { getGitDate } from "lume/core/utils/date.ts";
import { merge } from "lume/core/utils/object.ts";

export interface Options {
  extentions?: Extensions;
  dateKey?: string;
  lastModifiedKey?: string;
}

export const defaults: Options = {
  extentions: [".html"],
  dateKey: "date",
  lastModifiedKey: "lastModified",
};

export function gitDates(userOptions?: Options) {
  const options = merge(defaults, userOptions);
  return (site: Site) => {
    site.preprocess(options.extentions, (pages) => {
      for (const page of pages) {
        const entry = page.src.entry;
        if (!entry) continue;
        const file = entry.src;

        // first commit
        const created = getGitDate("created", file);
        if (created) page.data[options.dateKey] ??= created;

        // last modified
        const modified = getGitDate("modified", file);
        if (modified) page.data[options.lastModifiedKey] ??= modified;
      }
    });
  };
}

export default gitDates;
