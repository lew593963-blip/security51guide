import {describe, expect, it} from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {buildArticleJsonLd, buildArticleMetadata} from "@/lib/article-metadata";
import {contentRegistry} from "@/lib/content-registry";
import {siteConfig} from "@/lib/site";

describe("canonical indexing and structured data", () => {
  it("publishes exactly ten canonical English URLs", () => {
    expect(sitemap().map((entry) => entry.url).sort()).toEqual([
      "https://security51guide.wiki",
      "https://security51guide.wiki/about",
      "https://security51guide.wiki/anomalies",
      "https://security51guide.wiki/checkpoint-guide",
      "https://security51guide.wiki/contact",
      "https://security51guide.wiki/medical-tests",
      "https://security51guide.wiki/privacy-policy",
      "https://security51guide.wiki/quarantine",
      "https://security51guide.wiki/terms-of-service",
      "https://security51guide.wiki/walkthrough",
    ]);
  });

  it("points robots at the target canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: {userAgent: "*", allow: "/"},
      sitemap: "https://security51guide.wiki/sitemap.xml",
      host: "https://security51guide.wiki",
    });
  });

  it("gives every guide canonical metadata and Article JSON-LD", () => {
    for (const entry of contentRegistry) {
      expect(buildArticleMetadata(entry).alternates?.canonical).toBe(entry.route);
      expect(buildArticleMetadata(entry).openGraph?.images).toBeTruthy();
      const jsonLd = buildArticleJsonLd(entry);
      expect(jsonLd["@type"]).toBe("Article");
      expect(jsonLd.mainEntityOfPage).toBe(`${siteConfig.url}${entry.route}`);
    }
  });

  it("emits no www or preview hostname", () => {
    const payload = JSON.stringify({sitemap: sitemap(), config: siteConfig});
    expect(payload).not.toContain("www.");
    expect(payload).not.toContain("vercel.app");
  });
});
