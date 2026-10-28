import TrustPage from "../components/trust-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "Read how ToolsGeek handles browser data, local files, cookies, advertising, analytics, children's privacy, and contact requests.", path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
  return <TrustPage title="Privacy Policy" path="/privacy-policy" eyebrow="YOUR DATA AND TOOLS GEEK">
    <p><strong>Last updated: October 28, 2026</strong></p>
    <p>This policy explains how ToolsGeek handles information when you visit toolsgeek.online. ToolsGeek is operated by [TODO: owner to fill — name or organization]. Questions about this policy can be sent to <a href="mailto:support@toolsgeek.online">support@toolsgeek.online</a>.</p>
    <h2>Information you provide and files you use</h2>
    <p>Most tools process text, images, PDFs, and other selected content directly in your browser. Those files and tool inputs are not uploaded to ToolsGeek servers. Do not close the page during a conversion or export that is still running. A few convenience features, such as the daily checklist, may store data in local browser storage on your device. Clearing browser data removes that locally stored information.</p>
    <p>When you visit the site, your hosting provider and security systems may receive standard request data such as IP address, browser type, requested URL, referring page, and request time in server logs. These logs are used to deliver the site, diagnose errors, and protect it from abuse. ToolsGeek does not currently use a separate analytics service. If analytics are added, this policy will be updated to identify the service and its controls.</p>
    <h2>Cookies, advertising, and Google</h2>
    <p>ToolsGeek may use essential browser storage to remember your cookie and advertising choices. If advertising is enabled, Google AdSense and its advertising partners may use cookies or similar technologies to serve, limit, measure, and personalize ads. Google’s DoubleClick cookie can help show ads based on visits to this and other sites. The exact cookies and processing depend on your settings, region, and Google’s systems.</p>
    <p>Learn how Google uses information from sites and apps that use its services in the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">Google advertising technologies policy</a>. You can review or change personalization settings at <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a>. Browser controls can also block or remove cookies. Blocking cookies may affect advertising and some site preferences.</p>
    <p>Our consent banner lets visitors accept, reject, or manage advertising storage. It is a basic site preference tool and is not a Google-certified consent management platform. [TODO: owner to fill — configure a Google-certified CMP before serving personalized ads to visitors in the EEA, UK, or Switzerland.]</p>
    <h2>Children’s privacy</h2>
    <p>ToolsGeek is intended for a general audience and is not designed to collect personal information from children. We do not knowingly request personal information from children under 13. If you believe a child has submitted personal information through a contact message, email us so we can review and delete it where appropriate.</p>
    <h2>Your choices and rights</h2>
    <p>You can reject optional advertising storage in the consent banner, manage cookies through your browser, and clear locally saved tool data from browser settings. Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain personal data. To make a privacy request, contact us at the email below. We may ask for enough information to verify and respond to your request.</p>
    <h2>Retention, security, and changes</h2>
    <p>Browser-only tool content remains on your device until you clear it or the browser removes it. Operational server logs are retained for the period needed for security and troubleshooting by our hosting provider. We use reasonable safeguards, but no website or internet transmission can be guaranteed completely secure. We may update this policy as the service changes; the date above identifies the latest revision.</p>
    <h2>Contact</h2>
    <p>For privacy questions or requests, write to <a href="mailto:support@toolsgeek.online">support@toolsgeek.online</a>.</p>
  </TrustPage>;
}
