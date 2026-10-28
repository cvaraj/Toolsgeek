import Link from "next/link";
import BackgroundWorkspace from "./background-workspace";
import Breadcrumbs from "../../components/breadcrumbs";
import SiteFooter from "../../components/site-footer";
import AdSlot from "../../components/ad-slot";
import SeoJsonLd from "../../seo-jsonld";
import ToolArticle from "../[slug]/tool-article";
import { toolBySlug } from "../tool-catalog";
import { toolContent } from "../tool-content";
import { pageMetadata, SITE_URL } from "../../seo";

const tool = toolBySlug["background-generator"];
const content = toolContent[tool.slug];

export const metadata = pageMetadata({ title: tool.seoTitle, description: tool.seoDescription, path: "/tools/background-generator", image: "/og/background-generator", absoluteTitle: true });

export default function BackgroundGeneratorPage() {
  return <main className="site-shell workbench-shell">
    <SeoJsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "SoftwareApplication", name: tool.title, description: tool.description, applicationCategory: "MultimediaApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript and a modern browser with Canvas support.", url: `${SITE_URL}/tools/${tool.slug}`, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
      { "@type": "FAQPage", mainEntity: content.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ] }} />
    <header className="site-header"><Link className="brand" href="/" aria-label="ToolsGeek home"><span className="brand-mark">t</span><span>toolsgeek<span className="brand-dot">.</span></span></Link><nav className="site-nav" aria-label="Main navigation"><Link className="nav-link" href="/tools">All tools</Link><Link className="nav-cta" href="/tools">Browse tools <span aria-hidden="true">↗</span></Link></nav></header>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: tool.title, href: `/tools/${tool.slug}` }]} />
    <div className="workbench-back"><Link href="/tools">← All tools</Link><span>{tool.category.toUpperCase()}</span></div>
    <section className="workbench-heading"><h1>{tool.title}</h1><p>{tool.description}</p></section>
    <section className="workbench-panel" aria-label={`${tool.title} controls`}><BackgroundWorkspace /></section>
    <AdSlot slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_MID} format="auto" responsive minHeight={280} />
    <ToolArticle tool={tool} content={content} afterFaqAdSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL_AFTER_FAQ} />
    <SiteFooter />
  </main>;
}
