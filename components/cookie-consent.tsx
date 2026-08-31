"use client";

import Link from "next/link";
import {useEffect, useState} from "react";

import {
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  type ConsentChoice,
  type ConsentContent,
} from "@/lib/consent";
import {
  requestDocumentReload,
  revokeRequestedSocialBars,
} from "@/lib/adsterra-social-bar-state";
import {saveConsentChoice, useConsentChoice} from "@/lib/use-consent";

import styles from "./cookie-consent.module.css";

type CookieConsentProps = {
  content: ConsentContent;
  privacyHref: string;
  reload?: () => void;
};

function updateGoogleConsent(choice: ConsentChoice) {
  const value = choice === "granted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export function clearGoogleAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => /^_ga(?:_|$)/.test(name));

  for (const name of names) {
    const expiry = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = expiry;
    document.cookie = `${expiry}; Domain=${window.location.hostname}`;
    document.cookie = `${expiry}; Domain=.${window.location.hostname}`;
  }
}

export function CookieConsent({
  content,
  privacyHref,
  reload = () => window.location.reload(),
}: CookieConsentProps) {
  const choice = useConsentChoice();
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    if (choice) updateGoogleConsent(choice);
  }, [choice]);

  useEffect(() => {
    const open = () => setForceOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  function save(choice: ConsentChoice) {
    const isRevokingGrantedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY) === "granted"
      && choice === "denied";
    updateGoogleConsent(choice);
    if (choice === "denied") clearGoogleAnalyticsCookies();
    saveConsentChoice(choice);
    setForceOpen(false);
    if (isRevokingGrantedConsent) {
      revokeRequestedSocialBars();
      requestDocumentReload(reload);
    }
  }

  if (choice && !forceOpen) return null;

  return (
    <section className={styles.banner} role="dialog" aria-label={content.title} aria-live="polite">
      <div className={styles.copy}>
        <strong>{content.title}</strong>
        <p>{content.description} <Link href={privacyHref}>{content.privacy}</Link></p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={() => save("denied")}>
          {content.reject}
        </button>
        <button type="button" className={styles.secondary} onClick={() => save("denied")}>
          {content.necessary}
        </button>
        <button type="button" className={styles.primary} onClick={() => save("granted")}>
          {content.accept}
        </button>
      </div>
    </section>
  );
}

export function CookieSettingsButton({label}: {label: string}) {
  return (
    <button
      className="footer-settings"
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      {label}
    </button>
  );
}
