import { tools } from "./tools/tool-catalog";
import { SITE_URL } from "./seo";

export default function sitemap() {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/tools", priority: 0.9 },
    ...tools.map((tool) => ({ path: tool.slug === "background-generator" ? "/background-generator" : `/tools/${tool.slug}`, priority: 0.7 })),
  ];
  return pages.map(({ path, priority }) => ({ url: new URL(path, SITE_URL).toString(), priority }));
}
