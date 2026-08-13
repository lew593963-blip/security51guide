import {describe, expect, it} from "vitest";

import {getLocaleRouteAction} from "@/lib/locale-routing";

describe("locale routing", () => {
  it("keeps canonical locale redirects and public-route rewrites intact", () => {
    expect(getLocaleRouteAction("/en/anomalies")).toEqual({
      type: "redirect",
      locale: "en",
      pathname: "/anomalies",
    });
    expect(getLocaleRouteAction("/anomalies")).toEqual({
      type: "rewrite",
      locale: "en",
      pathname: "/en/anomalies",
    });
  });
});
