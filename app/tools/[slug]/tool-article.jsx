import Link from "next/link";
import { toolBySlug } from "../tool-catalog";
import AdSlot from "../../components/ad-slot";

export default function ToolArticle({ tool, content, afterFaqAdSlot }) {
  const related = content.related.map((slug) => toolBySlug[slug]).filter(Boolean);
  return <article className="tool-article">
    <section aria-labelledby="tool-overview"><h2 id="tool-overview">What is {tool.title}?</h2>{content.what.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
    <section aria-labelledby="tool-steps"><h2 id="tool-steps">How to use {tool.title}</h2><ol>{content.steps.map(([title, text]) => <li key={title}><strong>{title}.</strong> {text}</li>)}</ol></section>
    <section aria-labelledby="tool-features"><h2 id="tool-features">Key features and why use this tool</h2><ul>{content.features.map(([title, text]) => <li key={title}><strong>{title}.</strong> {text}</li>)}</ul></section>
    <section aria-labelledby="tool-tips"><h2 id="tool-tips">Tips and best practices</h2><ul>{content.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></section>
    <section aria-labelledby="tool-privacy"><h2 id="tool-privacy">Privacy and security</h2><p>{content.privacy}</p></section>
    <section className="tool-faq" aria-labelledby="tool-faq-heading"><h2 id="tool-faq-heading">Frequently asked questions</h2>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <AdSlot slotId={afterFaqAdSlot} format="auto" responsive minHeight={280} />
    <section className="related-tools" aria-labelledby="related-tools-heading"><h2 id="related-tools-heading">Related tools</h2><ul>{related.map((item) => <li key={item.slug}><Link href={`/tools/${item.slug}`}>{item.title}</Link><span>{item.description}</span></li>)}</ul><p><Link href="/tools">Browse the full tools collection →</Link></p></section>
  </article>;
}
