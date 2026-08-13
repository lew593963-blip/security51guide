import {describe, expect, it} from "vitest";

import {contentRegistry} from "@/lib/content-registry";
import {coreGuides, routes} from "@/lib/site";

describe("first Security 51 guide batch", () => {
  it("publishes five substantial non-overlapping guides", () => {
    expect(contentRegistry.map((entry) => entry.slug)).toEqual([
      "checkpoint-guide",
      "anomalies",
      "medical-tests",
      "quarantine",
      "walkthrough",
    ]);
    expect(coreGuides).toHaveLength(5);
    expect(routes).not.toHaveProperty("endings");
    expect(routes).not.toHaveProperty("achievements");
  });

  it("keeps every article above the thin-content floor", () => {
    for (const entry of contentRegistry) {
      const words = entry.source.split(/\s+/).filter(Boolean);
      expect(words.length, entry.slug).toBeGreaterThan(700);
      expect(entry.frontmatter.description.length, entry.slug).toBeLessThanOrEqual(180);
    }
  });
});
