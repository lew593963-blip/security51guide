"use client";

import {GoogleAnalytics} from "@next/third-parties/google";

import {useConsentChoice} from "@/lib/use-consent";

export function ConsentGatedGoogleAnalytics({measurementId}: {measurementId: string}) {
  const consentChoice = useConsentChoice();

  return consentChoice === "granted" ? <GoogleAnalytics gaId={measurementId} /> : null;
}
