"use client";

import {useEffect} from "react";

import type {RootConfig} from "@/config";
import {
  isSocialBarRequestBlocked,
  markSocialBarRequested,
  requestDocumentReload,
  revokeSocialBar,
} from "@/lib/adsterra-social-bar-state";
import {useConsentChoice} from "@/lib/use-consent";

type AdsterraSocialBarPlacement = Extract<
  RootConfig["integrations"]["adsterra"],
  {enabled: true}
>;

type AdsterraSocialBarProps = {
  placement: AdsterraSocialBarPlacement;
  productionHostname: string;
  reload?: () => void;
};

function findOwnedScript(scriptId: string) {
  const element = document.getElementById(scriptId);
  return element instanceof HTMLScriptElement
    && element.dataset.adsterraSocialBar === scriptId
    ? element
    : null;
}

export function AdsterraSocialBar({
  placement,
  productionHostname,
  reload = () => window.location.reload(),
}: AdsterraSocialBarProps) {
  const consentChoice = useConsentChoice();

  useEffect(() => {
    if (window.location.hostname !== productionHostname) return;

    if (consentChoice !== "granted") {
      if (revokeSocialBar(placement.scriptId)) requestDocumentReload(reload);
      return;
    }

    if (isSocialBarRequestBlocked(placement.scriptId)) return;

    if (findOwnedScript(placement.scriptId)) {
      markSocialBarRequested(placement.scriptId);
      return;
    }

    if (document.getElementById(placement.scriptId)) return;

    const script = document.createElement("script");
    script.id = placement.scriptId;
    script.async = true;
    script.setAttribute("data-adsterra-social-bar", placement.scriptId);
    script.setAttribute("data-cfasync", "false");
    script.src = placement.scriptUrl;
    document.body.append(script);
    markSocialBarRequested(placement.scriptId);
  }, [consentChoice, placement, productionHostname, reload]);

  return null;
}
