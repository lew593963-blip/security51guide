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

  it("answers measured day-count and checkpoint intent without inventing routes", () => {
    const walkthrough = contentRegistry.find(({slug}) => slug === "walkthrough");
    const checkpoint = contentRegistry.find(({slug}) => slug === "checkpoint-guide");

    expect(walkthrough?.source).toMatch(
      /^### How many days are in Security 51\?$/m,
    );
    expect(walkthrough?.source).toMatch(
      /documents Day 1 through Day 30[\s\S]{0,160}not proof[\s\S]{0,80}ends/i,
    );
    expect(walkthrough?.source).toMatch(
      /^### Does this walkthrough include every ending and achievement\?$/m,
    );
    expect(checkpoint?.frontmatter.title).toBe(
      "Security 51 Checkpoint Guide & Clearance Levels",
    );
    expect(checkpoint?.source.split(/\n\s*\n/)[0]).toMatch(
      /checkpoint guide[\s\S]*documents[\s\S]*clearance levels/i,
    );
  });
});
