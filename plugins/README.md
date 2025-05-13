# Plugins

This directory contains custom [Lume](https://github.com/lumeland/lume) plugins used in the Forest theme.

Each plugin exports a default function returning a Lume plugin. Use with your Lume site:

```ts
import pluginName from "./plugin_file.ts";
site.use(pluginName(options));
```

## addRemarkToc

Insert a Table of Contents into Markdown files by replacing a placeholder and wrapping the ToC in HTML.

**Import**

```ts
import addRemarkToc from "./add_remark_toc.ts";
```

**Usage**

```ts
site.use(addRemarkToc({
  extentions: [".md"],
  placeholder: /<!-- toc -->/g,
  text: "## Table of Contents",
}));
```

**Options**

| Name        | Type       | Default                  | Description                                  |
| ----------- | ---------- | ------------------------ | -------------------------------------------- |
| extentions  | `string[]` | `[".md"]`              | File extensions to process.                  |
| placeholder | `RegExp`   | `/<!-- toc -->/g`        | Placeholder pattern to replace with the ToC. |
| text        | `string`   | `"## Table of Contents"` | Heading text for the Table of Contents.    |

## gitDates

Add Git creation and last modified dates to each page's data by reading Git history.

**Import**

```ts
import gitDates from "./git_dates.ts";
```

**Usage**

```ts
site.use(gitDates({
  extentions: [".html"],
  dateKey: "date",
  lastModifiedKey: "lastModified",
}));
```

**Options**

| Name            | Type       | Default          | Description                               |
| --------------- | ---------- | ---------------- | ----------------------------------------- |
| extentions      | `string[]` | `[".html"]`    | File extensions to process.               |
| dateKey         | `string`   | `"date"`       | Page data key for creation date.          |
| lastModifiedKey | `string`   | `"lastModified"` | Page data key for last modified date.   |

## gitHashes

Add Git commit hashes (created and modified) to each page's data by reading Git history.

**Import**

```ts
import gitHashes from "./git_hashes.ts";
```

**Usage**

```ts
site.use(gitHashes({
  extensions: [".html"],
  hashesKey: "hashes",
  createdKey: "created",
  modifiedKey: "modified",
}));
```

**Options**

| Name        | Type       | Default          | Description                                     |
| ----------- | ---------- | ---------------- | ----------------------------------------------- |
| extensions  | `string[]` | `[".html"]`    | File extensions to process.                     |
| hashesKey   | `string`   | `"hashes"`     | Page data key under which hashes are stored.    |
| createdKey  | `string`   | `"created"`    | Key for the creation commit hash.               |
| modifiedKey | `string`   | `"modified"`   | Key for the last modified commit hash.          |

## repoLatestHash

Set the repository's latest commit hash on the site's data under a specified key.

**Import**

```ts
import repoLatestHash from "./repo_latest_hash.ts";
```

**Usage**

```ts
site.use(repoLatestHash({
  hashesKey: "hashes",
  repoKey: "repo",
}));
```

**Options**

| Name       | Type     | Default      | Description                                          |
| ---------- | -------- | ------------ | ---------------------------------------------------- |
| hashesKey  | `string` | `"hashes"`  | Site data key under which the hash object is merged. |
| repoKey    | `string` | `"repo"`    | Key in the hash object for the repository commit.    |