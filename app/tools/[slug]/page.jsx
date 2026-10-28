import { notFound } from "next/navigation";
import ToolWorkspace from "./tool-workspace";
import { toolBySlug, tools } from "../tool-catalog";
import SeoJsonLd from "../../seo-jsonld";
import { SITE_URL, pageMetadata } from "../../seo";
import { toolContent } from "../tool-content";
import Breadcrumbs from "../../components/breadcrumbs";
import SiteFooter from "../../components/site-footer";
import AdSlot from "../../components/ad-slot";
import ToolArticle from "./tool-article";
import Link from "next/link";

export function generateStaticParams() {
  return tools.filter((tool) => tool.slug !== "background-generator").map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool || slug === "background-generator") return { title: "Tool not found" };
  return pageMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/tools/${slug}`,
    image: `/og/${slug}`,
    absoluteTitle: true,
  });
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = toolBySlug[slug];
  if (!tool || slug === "background-generator") notFound();
  const content = toolContent[slug];
  if (!content) notFound();
  const applicationCategory = tool.category.startsWith("Image") || tool.category.startsWith("Design") || tool.category.startsWith("PDF")
    ? "MultimediaApplication"
    : tool.category.startsWith("Developer") ? "DeveloperApplication" : "UtilitiesApplication";
  return <main className="site-shell workbench-shell">
    <SeoJsonLd data={{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          name: tool.title,
          description: tool.description,
          applicationCategory,
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript and a modern web browser.",
          url: `${SITE_URL}/tools/${slug}`,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
          "@type": "FAQPage",
          mainEntity: content.faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    }} />
    <header className="site-header"><Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><nav className="site-nav" aria-label="Main navigation"><Link className="nav-link" href="/tools">All tools</Link><Link className="nav-cta" href="/tools">Browse tools <span aria-hidden="true">↗</span></Link></nav></header>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: tool.title, href: `/tools/${slug}` }]} />
    <div className="workbench-back"><Link href="/tools">← All tools</Link><span>{tool.category.toUpperCase()}</span></div>
    <section className="workbench-heading"><h1>{tool.title}</h1><p>{tool.description}</p></section>
    <section className="workbench-panel" aria-label={`${tool.title} controls`}><ToolWorkspace tool={tool} /></section>
    <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_MID} format="auto" responsive minHeight={280} />
    <ToolArticle tool={tool} content={content} afterFaqAdSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_AFTER_FAQ} />
    <SiteFooter />
  </main>;
}
