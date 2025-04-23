import CMS from "lume/cms/mod.ts";

const cms = CMS();

cms.document({
  name: "Site settings",
  description: "Default settings for the site",
  store: "src:_data.yml",
  fields: [
    "lang: text",
    {
      name: "metas",
      type: "object",
      fields: [
        "site: text",
        "twitter: text",
        "fediverse: text",
        "icon: file",
        "lang: hidden",
        "generator: checkbox",
      ],
    },
  ],
});

cms.document({
  name: "Homepage",
  description: "Main page of the site",
  store: "src:index.vto",
  fields: [
    {
      name: "layout",
      type: "text",
      attributes: {
        pattern: '^layouts\\/(?:[^\\/]+\\/)*[^\\/]+\\.[^\\/]+$',
      }
    },
    {
      name: "title",
      type: "text",
      value: "Home",
    },
    {
      name: "content",
      type: "code",
      value: `
<p>This is a boilerplate to create a Lume theme.</p>

{{ set posts = search.pages("type=post", "date=desc") }}
<ul>
  {{ for post of posts }}
    <li>
      <a href="{{ post.url }}" title="{{ post.title }}"><time
          datetime="{{ post.date |> date('DATE') }}"
        >{{ post.date |> date("DATE") }}</time>: {{ post.title }}</a>
    </li>
  {{ /for }}
</ul>`,
    },
  ],
});

cms.document({
  name: "404 page",
  description: "404 page of the site",
  store: "src:404.vto",
  fields: [
    {
      name: "layout",
      type: "text",
      attributes: {
        pattern: '^layouts\\/(?:[^\\/]+\\/)*[^\\/]+\\.[^\\/]+$',
      },
      value: "layouts/layout.vto"
    },
    {
      name: "title",
      type: "text",
      value: "Page Not Found",
    },
    {
      name: "url",
      type: "text",
      value: "/404.html",
      attributes: {
        pattern: "^\\/.*$"
      }
    },
    {
      name: "content",
      type: "code",
      value: `
<main class="flex flex-col justify-center text-center">
  <div class="text-9xl/30 font-bold font-display">404</div>
  <h1 class="text-2xl font-bold font-display">Page Not Found</h1>
  <p class="mt-4 text-xs text-neutral-400">This page flew away.</p>
</main>`,
    },
  ],
});

cms.upload("uploads: Uploaded files", "src:uploads");

export default cms;
