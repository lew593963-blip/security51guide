import {describe, expect, it} from "vitest";

import {legalContent} from "@/lib/legal-content";

describe("production privacy disclosure", () => {
  it("matches the consent-gated GA4 and Adsterra implementation", () => {
    const privacy = [
      legalContent.en.privacyIntro,
      ...legalContent.en.privacySections.map(({title, body}) => `${title} ${body}`),
    ].join(" ");

    expect(privacy).toMatch(/Google Analytics 4/i);
    expect(privacy).toMatch(/Adsterra/i);
    expect(privacy).toMatch(/consent/i);
    expect(privacy).toMatch(/reject/i);
    expect(privacy).not.toMatch(/currently disabled|does not enable|no active analytics/i);
  });
});
