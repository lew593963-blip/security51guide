import {readFileSync} from "node:fs";
import {resolve} from "node:path";

import {describe, expect, it} from "vitest";

import {rootConfig} from "@/config";

describe("Security 51 production target config", () => {
  it("owns the correct game, domain, legal identity, and repository", () => {
    expect(rootConfig.game.name).toBe("Security 51");
    expect(rootConfig.game.steamAppId).toBe("4246860");
    expect(rootConfig.site.url).toBe("https://security51guide.wiki");
    expect(rootConfig.site.copyright.holder).toBe("Security 51 Guide");
    expect(rootConfig.links.repository).toBe("https://github.com/lew593963-blip/security51guide");
    expect(rootConfig.brand.mark192).toBe("/icon.svg");
    expect(rootConfig.brand.mark512).toBe("/icon.svg");
    expect(rootConfig.brand.favicon).toBe("/favicon.ico");
    expect(rootConfig.brand.appleIcon).toBe("/apple-icon.png");
  });

  it("ships a square Google-compatible favicon of at least 48 pixels", () => {
    const favicon = readFileSync(resolve(process.cwd(), "app/favicon.ico"));
    const imageCount = favicon.readUInt16LE(4);
    const width = favicon[6] === 0 ? 256 : favicon[6];
    const height = favicon[7] === 0 ? 256 : favicon[7];

    expect([...favicon.subarray(0, 4)]).toEqual([0, 0, 1, 0]);
    expect(imageCount).toBeGreaterThan(0);
    expect(width).toBe(height);
    expect(width).toBeGreaterThanOrEqual(48);
  });

  it("ships a square PNG apple touch icon", () => {
    const appleIcon = readFileSync(resolve(process.cwd(), "app/apple-icon.png"));

    expect([...appleIcon.subarray(0, 8)]).toEqual([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ]);
    expect(appleIcon.readUInt32BE(16)).toBe(180);
    expect(appleIcon.readUInt32BE(20)).toBe(180);
  });

  it("enables exactly the approved consent-gated GA4 and Social Bar integrations", () => {
    expect(rootConfig.integrations).toEqual({
      analytics: {
        enabled: true,
        measurementIdEnv: "NEXT_PUBLIC_GA_MEASUREMENT_ID",
      },
      adsense: {enabled: false},
      adsterra: {
        enabled: true,
        format: "social-bar",
        scriptId: "adsterra-social-bar-31005823",
        scriptUrl:
          "https://pl31106322.profitableratecpmnetwork.com/cf/02/32/cf023218d6f8b9be18db86d6d8ee28bb.js",
        consentRequired: true,
      },
    });
    expect(JSON.stringify(rootConfig.integrations)).not.toMatch(/G-HJ1R7W13QH|ca-pub-|atOptions/);
  });
});
