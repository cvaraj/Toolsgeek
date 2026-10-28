"use client";

import { useEffect, useRef } from "react";
import { useAdsConsent } from "./ads-consent";

export default function AdSlot({ slotId, format = "auto", responsive = true, minHeight = 280 }) {
  const { consent, enabled } = useAdsConsent();
  const adRef = useRef(null);

  useEffect(() => {
    if (!enabled || consent !== "accepted" || !slotId || !adRef.current || adRef.current.dataset.initialized) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adRef.current.dataset.initialized = "true";
    } catch {
      // AdSense can fail independently; leave the reserved area without disrupting the tool.
    }
  }, [consent, enabled, slotId]);

  if (!enabled || consent !== "accepted" || !slotId) return null;
  return <aside className="ad-slot" aria-label="Advertisement" style={{ minHeight }}>
    <span className="ad-slot-label">Advertisement</span>
    <ins ref={adRef} className="adsbygoogle" style={{ display: "block", minHeight: Math.max(0, minHeight - 30) }}
      data-ad-client="ca-pub-9500588134322363" data-ad-slot={slotId} data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"} />
  </aside>;
}
