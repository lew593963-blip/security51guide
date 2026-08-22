import {act, render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";

import {AdsterraNativeBanner} from "@/components/adsterra-native-banner";
import {ConsentGatedGoogleAnalytics} from "@/components/consent-gated-google-analytics";
import {saveConsentChoice} from "@/lib/use-consent";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({gaId}: {gaId: string}) => (
    <div data-testid="google-analytics" data-measurement-id={gaId} />
  ),
}));

vi.mock("next/script", () => ({
  default: ({id, src}: {id: string; src: string}) => (
    <div data-testid="third-party-script" id={id} data-src={src} />
  ),
}));

const placement = {
  enabled: true as const,
  scriptId: "adsterra-native-banner-30786797",
  scriptUrl:
    "https://pl30887296.profitableratecpmnetwork.com/d13e34863ce26f867a3c61052b13889e/invoke.js",
  containerId: "container-d13e34863ce26f867a3c61052b13889e",
  consentRequired: true,
};

describe("consent-gated production integrations", () => {
  beforeEach(() => window.localStorage.clear());

  it("does not load GA4 or Adsterra before an explicit choice", () => {
    render(
      <>
        <ConsentGatedGoogleAnalytics measurementId="G-HJ1R7W13QH" />
        <AdsterraNativeBanner placement={placement} />
      </>,
    );

    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(screen.queryByTestId("third-party-script")).not.toBeInTheDocument();
    expect(document.getElementById(placement.containerId)).not.toBeInTheDocument();
  });

  it("loads the single approved GA4 tag and Adsterra placement after consent", () => {
    render(
      <>
        <ConsentGatedGoogleAnalytics measurementId="G-HJ1R7W13QH" />
        <AdsterraNativeBanner placement={placement} />
      </>,
    );

    act(() => saveConsentChoice("granted"));

    expect(screen.getByTestId("google-analytics")).toHaveAttribute(
      "data-measurement-id",
      "G-HJ1R7W13QH",
    );
    expect(screen.getByTestId("third-party-script")).toHaveAttribute(
      "data-src",
      placement.scriptUrl,
    );
    expect(document.getElementById(placement.containerId)).toBeInTheDocument();
  });

  it("removes both optional integrations after consent is denied", () => {
    window.localStorage.setItem("security-51-guide-consent", "granted");
    render(
      <>
        <ConsentGatedGoogleAnalytics measurementId="G-HJ1R7W13QH" />
        <AdsterraNativeBanner placement={placement} />
      </>,
    );

    act(() => saveConsentChoice("denied"));

    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(screen.queryByTestId("third-party-script")).not.toBeInTheDocument();
    expect(document.getElementById(placement.containerId)).not.toBeInTheDocument();
  });
});
