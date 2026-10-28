import TrustPage from "../components/trust-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "About ToolsGeek", description: "Meet ToolsGeek, a collection of practical browser tools built to make everyday creative, writing, file, and productivity tasks simpler.", path: "/about" });

export default function AboutPage() {
  return <TrustPage title="About ToolsGeek" path="/about" eyebrow="A SMALL, USEFUL TOOLBOX">
    <p>ToolsGeek is a growing collection of focused utilities for common tasks: preparing images, working with text, handling PDFs, organizing a day, and solving small development problems. Each tool is designed to be understandable without a manual and quick to use when you need it.</p>
    <h2>Our mission</h2>
    <p>Our aim is to make dependable tools easy to reach. A one-off task should not require installing a large application or creating an account. ToolsGeek brings simple controls and clear results together in one place, with a practical focus on useful everyday work.</p>
    <h2>Privacy by design</h2>
    <p>Where a tool works with files or entered content, processing is performed in your browser. The files selected for those tools are not uploaded to ToolsGeek servers. Some tools may save a small preference or checklist in your browser storage so it is available the next time you visit on that device. See the <a href="/privacy-policy">Privacy Policy</a> for details about site data and advertising.</p>
    <h2>Who runs ToolsGeek?</h2>
    <p>ToolsGeek is run by [TODO: owner to fill — name or organization]. The project is based in [TODO: owner to fill — country or region]. For questions, corrections, or accessibility feedback, contact <a href="mailto:support@toolsgeek.online">support@toolsgeek.online</a>.</p>
    <h2>How we work</h2>
    <p>We try to describe each tool plainly, keep controls focused, and make limitations visible. Tools are provided as practical helpers; you remain responsible for checking generated results before relying on them in important work. New tools and improvements are added as the collection grows.</p>
  </TrustPage>;
}
