import { notFound } from "next/navigation";
import ToolWorkspace from "./tool-workspace";
import { toolBySlug, tools } from "../tool-catalog";
import SeoJsonLd from "../../seo-jsonld";
import { SITE_URL, pageMetadata } from "../../seo";

export function generateStaticParams() {
  return tools.filter((tool) => tool.slug !== "background-generator").map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool || slug === "background-generator") return { title: "Tool not found" };
  return pageMetadata({
    title: tool.title,
    description: `${tool.description} Free to use in your browser with ToolsGeek.`,
    path: `/tools/${slug}`,
    image: `/og/${slug}`,
  });
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool || slug === "background-generator") notFound();
  return <><SeoJsonLd data={{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: tool.category.startsWith("Design") || tool.category.startsWith("Image") ? "DesignApplication" : tool.category.startsWith("Developer") ? "DeveloperApplication" : "UtilitiesApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/tools/${slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }} /><ToolWorkspace tool={tool} /></>;
}
