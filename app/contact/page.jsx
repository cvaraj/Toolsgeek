import TrustPage from "../components/trust-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Contact ToolsGeek", description: "Contact ToolsGeek for support, accessibility feedback, bug reports, privacy questions, or suggestions for new browser-based tools.", path: "/contact" });

export default function ContactPage() {
  return <TrustPage title="Contact ToolsGeek" path="/contact" eyebrow="WE’RE HERE TO HELP">
    <p>Have a question about a tool, spotted a problem, or want to suggest an improvement? Email is the best way to reach the ToolsGeek team.</p>
    <p className="contact-email-card"><a href="mailto:support@toolsgeek.online">support@toolsgeek.online</a></p>
    <p>For a faster reply, include the name of the tool and the browser you are using. Please do not email sensitive files or passwords; our tools are designed to process supported files in your browser.</p>
  </TrustPage>;
}
