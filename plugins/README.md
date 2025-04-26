# Plugins for Forest

## git_data.ts

```typescript
site.use(gitData());
```

### What this plugin does

- Run `git show` in your site directory (the root of your project).

  ```typescript
  const longHashCommand = new Deno.Command("git", {
    args: ["show", "--format=%H", "--no-patch"],
    stdout: "piped",
  });
  const shortHashCommand = new Deno.Command("git", {
    args: ["show", "--format=%h", "--no-patch"],
    stdout: "piped",
  });
  ```

- Set the hash of the latest commit to the `git.hash.long` and `git.hash.short` of all pages

## add_remark_toc.ts

```typescript
site.use(addRemarkToc({
  placeholder: /<!-- toc -->/g,
  text: "## Table of Contents",
}));
```

This plugin requires the Lume [remark](https://lume.land/plugins/remark/) plugin and the remark plugins [remark-toc](https://github.com/remarkjs/remark-toc), [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings) and [rehype-slug](https://github.com/rehypejs/rehype-slug).

### What this plugin does

- Before building the page, replace the existing `placeholder` text with the `text` text in all `.md` files.
- After building the page, find the generated table of contents and wrap it in a `<div>` tag with a class of `table-of-contents`.
