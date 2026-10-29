"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CONSENT_KEY = "toolsgeek-ad-consent-v1";
const CONSENT_CONTEXT = createContext({ consent: null, enabled: false });
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

export function useAdsConsent() {
  return useContext(CONSENT_CONTEXT);
}

export default function AdsConsentProvider({ children }) {
  const [consent, setConsent] = useState(null);
  const [manage, setManage] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setConsent(saved);
        setAdvertising(saved === "accepted");
      }
    } catch {
      // Keep the banner visible if browser storage is unavailable.
    }
    setReady(true);
  }, []);

  const save = (choice) => {
    setConsent(choice);
    setAdvertising(choice === "accepted");
    setManage(false);
    try { window.localStorage.setItem(CONSENT_KEY, choice); } catch { /* Current visit preference still applies. */ }
  };

  const context = useMemo(() => ({ consent, enabled: ADSENSE_ENABLED }), [consent]);

  return <CONSENT_CONTEXT.Provider value={context}>
    {children}
    {ready && consent === null && <aside className="consent-banner" aria-label="Cookie and advertising choices">
      <div className="consent-copy"><strong>Privacy choices</strong><p>ToolsGeek uses essential browser storage for your preferences. If enabled, Google may use cookies for advertising. You can accept, reject, or manage advertising storage. Read our <a href="/privacy-policy">Privacy Policy</a>.</p>
        {manage && <div className="consent-manage"><label><input type="checkbox" checked disabled /> Essential preferences <span>Always active</span></label><label><input type="checkbox" checked={advertising} onChange={(event) => setAdvertising(event.target.checked)} /> Advertising storage</label><p>TODO: Replace this basic preference banner with a Google-certified CMP before serving personalized ads to visitors in the EEA, UK, or Switzerland.</p><button type="button" className="consent-action" onClick={() => save(advertising ? "accepted" : "rejected")}>Save choices</button></div>}
      </div>
      <div className="consent-actions"><button type="button" className="consent-action" onClick={() => save("accepted")}>Accept</button><button type="button" className="consent-action secondary" onClick={() => save("rejected")}>Reject</button><button type="button" className="consent-link" onClick={() => setManage((open) => !open)}>{manage ? "Close" : "Manage"}</button></div>
    </aside>}
  </CONSENT_CONTEXT.Provider>;
}
