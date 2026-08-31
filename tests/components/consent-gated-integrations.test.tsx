import {act, render, screen, waitFor} from "@testing-library/react";
import {StrictMode} from "react";
import userEvent from "@testing-library/user-event";
import {beforeEach, describe, expect, it, vi} from "vitest";

import {AdsterraSocialBar} from "@/components/adsterra-social-bar";
import {ConsentGatedGoogleAnalytics} from "@/components/consent-gated-google-analytics";
import {clearGoogleAnalyticsCookies, CookieConsent} from "@/components/cookie-consent";
import {CONSENT_CHANGE_EVENT, CONSENT_OPEN_EVENT, CONSENT_STORAGE_KEY, consentContent} from "@/lib/consent";
import {saveConsentChoice} from "@/lib/use-consent";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({gaId}: {gaId: string}) => (
    <div data-testid="google-analytics" data-measurement-id={gaId} />
  ),
}));

const placement = {
  enabled: true as const,
  format: "social-bar" as const,
  scriptId: "adsterra-social-bar-31005823",
  scriptUrl:
    "https://pl31106322.profitableratecpmnetwork.com/cf/02/32/cf023218d6f8b9be18db86d6d8ee28bb.js",
  consentRequired: true as const,
};

function socialBarScripts() {
  return document.querySelectorAll(`script[data-adsterra-social-bar="${placement.scriptId}"]`);
}

describe("consent-gated production integrations", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.querySelectorAll("script[data-adsterra-social-bar]").forEach((script) => script.remove());
    delete (window as Window & {__security51GuideSocialBarState?: unknown})
      .__security51GuideSocialBarState;
  });

  it("does not request Social Bar before advertising permission", () => {
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
      />,
    );

    expect(socialBarScripts()).toHaveLength(0);
  });

  it("does not request Social Bar when advertising permission is refused", () => {
    window.localStorage.setItem("security-51-guide-consent", "denied");

    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
      />,
    );

    expect(socialBarScripts()).toHaveLength(0);
  });

  it("inserts the approved Social Bar script in the body after permission", () => {
    window.localStorage.setItem("security-51-guide-consent", "granted");

    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
      />,
    );

    const script = socialBarScripts().item(0);
    expect(script).toHaveAttribute("src", placement.scriptUrl);
    expect(script).toHaveAttribute("data-cfasync", "false");
    expect(script?.parentElement).toBe(document.body);
    expect(document.querySelector("[aria-label='Advertisement']")).not.toBeInTheDocument();
  });

  it("keeps one Social Bar script through StrictMode rerenders and remounts", () => {
    window.localStorage.setItem("security-51-guide-consent", "granted");
    const view = render(
      <StrictMode>
        <AdsterraSocialBar
          placement={placement}
          productionHostname={window.location.hostname}
        />
      </StrictMode>,
    );

    view.rerender(
      <StrictMode>
        <AdsterraSocialBar
          placement={placement}
          productionHostname={window.location.hostname}
        />
      </StrictMode>,
    );
    view.unmount();
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
      />,
    );

    expect(socialBarScripts()).toHaveLength(1);
  });

  it("does not request Social Bar again if its vendor tag disappears before remount", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const view = render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
      />,
    );

    socialBarScripts().item(0)?.remove();
    view.unmount();
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
      />,
    );

    expect(socialBarScripts()).toHaveLength(0);
  });

  it("does not request Social Bar outside its production hostname", () => {
    window.localStorage.setItem("security-51-guide-consent", "granted");

    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname="security51guide.wiki"
      />,
    );

    expect(socialBarScripts()).toHaveLength(0);
  });

  it("removes the owned script and reloads once when consent is withdrawn", () => {
    window.localStorage.setItem("security-51-guide-consent", "granted");
    const reload = vi.fn();
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
        reload={reload}
      />,
    );

    act(() => saveConsentChoice("denied"));

    expect(window.localStorage.getItem("security-51-guide-consent")).toBe("denied");
    expect(socialBarScripts()).toHaveLength(0);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("reloads after withdrawal even when the vendor has removed its tag", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const reload = vi.fn();
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
        reload={reload}
      />,
    );

    socialBarScripts().item(0)?.remove();
    act(() => saveConsentChoice("denied"));

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("denied");
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("treats cleared consent as withdrawal after Social Bar was requested", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const reload = vi.fn();
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
        reload={reload}
      />,
    );

    act(() => {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    });

    expect(socialBarScripts()).toHaveLength(0);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("does not reinsert Social Bar while a withdrawal reload is pending", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const reload = vi.fn();
    render(
      <AdsterraSocialBar
        placement={placement}
        productionHostname={window.location.hostname}
        reload={reload}
      />,
    );

    act(() => saveConsentChoice("denied"));
    act(() => saveConsentChoice("granted"));

    expect(socialBarScripts()).toHaveLength(0);
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("keeps the consent-dialog reload when GA is active but Social Bar was not requested", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const reload = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <CookieConsent content={consentContent.en} privacyHref="/en/privacy" reload={reload} />
        <ConsentGatedGoogleAnalytics measurementId="G-HJ1R7W13QH" />
        <AdsterraSocialBar
          placement={placement}
          productionHostname="security51guide.wiki"
          reload={reload}
        />
      </>,
    );

    expect(screen.getByTestId("google-analytics")).toBeInTheDocument();
    act(() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT)));
    await user.click(screen.getByRole("button", {name: "Reject optional"}));

    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(socialBarScripts()).toHaveLength(0);
  });

  it("coordinates one consent-dialog reload when GA and Social Bar were both active", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    const reload = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <CookieConsent content={consentContent.en} privacyHref="/en/privacy" reload={reload} />
        <ConsentGatedGoogleAnalytics measurementId="G-HJ1R7W13QH" />
        <AdsterraSocialBar
          placement={placement}
          productionHostname={window.location.hostname}
          reload={reload}
        />
      </>,
    );

    expect(socialBarScripts()).toHaveLength(1);
    act(() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT)));
    await user.click(screen.getByRole("button", {name: "Reject optional"}));

    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(socialBarScripts()).toHaveLength(0);
  });

  it("keeps Google Analytics independently gated by the same optional choice", () => {
    render(<ConsentGatedGoogleAnalytics measurementId="G-HJ1R7W13QH" />);
    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();

    act(() => saveConsentChoice("granted"));

    expect(screen.getByTestId("google-analytics")).toHaveAttribute(
      "data-measurement-id",
      "G-HJ1R7W13QH",
    );
  });

  it("removes GA cookies without deleting unrelated site cookies", () => {
    document.cookie = "_ga=test; Path=/";
    document.cookie = "_ga_HJ1R7W13QH=session; Path=/";
    document.cookie = "site-preference=kept; Path=/";

    clearGoogleAnalyticsCookies();

    expect(document.cookie).not.toContain("_ga=");
    expect(document.cookie).not.toContain("_ga_HJ1R7W13QH=");
    expect(document.cookie).toContain("site-preference=kept");
  });
});
