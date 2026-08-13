import {describe, expect, it} from "vitest";

import {rootConfig} from "@/config";

describe("Security 51 production target config", () => {
  it("owns the correct game, domain, legal identity, and repository", () => {
    expect(rootConfig.game.name).toBe("Security 51");
    expect(rootConfig.game.steamAppId).toBe("4246860");
    expect(rootConfig.site.url).toBe("https://security51guide.wiki");
    expect(rootConfig.site.copyright.holder).toBe("Security 51 Guide");
    expect(rootConfig.links.repository).toBe("https://github.com/lew593963-blip/security51guide");
  });

  it("ships analytics and every advertising integration disabled", () => {
    expect(rootConfig.integrations).toEqual({
      analytics: {enabled: false},
      adsense: {enabled: false},
      adsterra: {enabled: false},
    });
    expect(JSON.stringify(rootConfig.integrations)).not.toMatch(/G-|ca-pub-|atOptions/);
  });
});
