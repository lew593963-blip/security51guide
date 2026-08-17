import {existsSync} from "node:fs";
import {join} from "node:path";

import {describe, expect, it} from "vitest";

describe("legal route compatibility", () => {
  it.each(["privacy", "terms"])("ships /%s as an App Router page", (route) => {
    expect(
      existsSync(join(process.cwd(), "app", "[locale]", route, "page.tsx")),
    ).toBe(true);
  });
});
