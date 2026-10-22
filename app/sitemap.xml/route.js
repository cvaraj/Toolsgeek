import { tools } from "../tools/tool-catalog";
import { SITE_URL } from "../seo";

export const dynamic = "force-static";

export async function GET() {
  const paths = [
    "/",
    "/tools",
    ...tools.map((tool) => tool.slug === "background-generator" ? "/background-generator" : `/tools/${tool.slug}`),
  ];

  const urls = paths.map((path) => `  <url><loc>${new URL(path, SITE_URL).toString()}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
