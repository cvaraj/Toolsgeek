import TrustPage from "../components/trust-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Review the terms for using ToolsGeek, including acceptable use, intellectual property, warranty disclaimers, and liability limits.", path: "/terms" });

export default function TermsPage() {
  return <TrustPage title="Terms of Use" path="/terms" eyebrow="USING THE TOOLBOX">
    <p><strong>Last updated: October 28, 2026</strong></p>
    <p>These terms apply to your use of ToolsGeek at toolsgeek.online. By using the site, you agree to these terms. If you do not agree, do not use the site. ToolsGeek is operated by [TODO: owner to fill — name or organization].</p>
    <h2>Using the tools</h2>
    <p>ToolsGeek provides browser-based utilities for general informational and productivity purposes. You may use the tools for lawful personal or business tasks. You are responsible for the files and information you choose to process and for reviewing results before using or sharing them.</p>
    <h2>Acceptable use</h2>
    <p>You may not use the site to violate laws or another person’s rights, upload or distribute malicious code, interfere with site operation, probe or attack systems, or attempt to bypass reasonable security controls. Do not use the site in a way that places unreasonable load on its services. We may limit access when needed to protect the site, its visitors, or service providers.</p>
    <h2>Your content and intellectual property</h2>
    <p>You retain rights to content and files you supply to a tool. The tools process supported inputs locally in your browser and do not transfer those files to ToolsGeek servers. You are responsible for having permission to use any material you provide. The ToolsGeek name, site design, software, and original site content are owned by [TODO: owner to fill — rights holder] or used with permission, and are protected by applicable intellectual property laws. These terms do not grant ownership of either party’s intellectual property.</p>
    <h2>Disclaimer of warranties</h2>
    <p>The site and its tools are provided “as is” and “as available,” without warranties of any kind to the extent permitted by law. We do not promise that a tool will be uninterrupted, error-free, compatible with every file, or suitable for a particular purpose. Conversion and generated results may differ because of browser support, input quality, formats, or settings. Keep a copy of important source files and independently verify results.</p>
    <h2>Limitation of liability</h2>
    <p>To the extent permitted by law, ToolsGeek and its operator are not liable for indirect, incidental, special, consequential, or punitive damages, or for lost data, revenue, or profits arising from use of the site. To the extent liability cannot be excluded, it is limited to the amount permitted by applicable law. Nothing in these terms limits rights that cannot legally be limited.</p>
    <h2>Changes and contact</h2>
    <p>We may update the tools or these terms as the service changes. The revised date will appear at the top of this page. Continued use after a change means you accept the updated terms where that is allowed by law. Questions can be sent to <a href="mailto:support@toolsgeek.online">support@toolsgeek.online</a>.</p>
  </TrustPage>;
}
