import {rootConfigSchema} from "./schema";

export const rootConfig = rootConfigSchema.parse({
  site: {
    name: "Security 51 Guide",
    shortName: "S51 Guide",
    url: "https://security51guide.wiki",
    titleTemplate: "%s | Security 51 Guide",
    homeTitle: "Security 51 Guide — Checkpoint, Anomalies & Tests",
    homeDescription:
      "Evidence-checked Security 51 guides for checkpoint decisions, anomalies, blood tests, quarantine, and the launch walkthrough.",
    keywords: [
      "Security 51",
      "Security 51 guide",
      "Security 51 walkthrough",
      "Security 51 anomalies",
      "Security 51 blood test",
      "Security 51 checkpoint guide",
      "Security 51 clearance levels",
      "Security 51 quarantine",
    ],
    localizedSeo: {
      en: {
        home: {
          title: "Security 51 Guide — Checkpoint, Anomalies & Tests",
          description:
            "Evidence-checked Security 51 guides for checkpoint decisions, anomalies, blood tests, quarantine, and the launch walkthrough.",
        },
        about: {
          title: "About Security 51 Guide — Sources & Evidence Policy",
          description:
            "Learn how Security 51 Guide separates official facts, current-build community observations, practical advice, and unresolved unknowns.",
        },
        contact: {
          title: "Contact Security 51 Guide — Corrections & Feedback",
          description:
            "Report a Security 51 guide correction, changed daily rule, broken link, accessibility issue, or privacy concern.",
        },
        privacy: {
          title: "Privacy Policy — Security 51 Guide",
          description:
            "Read how Security 51 Guide handles hosting logs, browser storage, external links, and disabled analytics and advertising.",
        },
        terms: {
          title: "Terms of Service — Security 51 Guide",
          description:
            "Review the terms for using Security 51 Guide, an independent fan resource with explicit evidence and version limits.",
        },
      },
    },
    copyright: {year: 2026, holder: "Security 51 Guide"},
  },
  game: {
    name: "Security 51",
    developer: "Alawar",
    publisher: "Alawar",
    releaseDate: "2026-08-12",
    currentVersion: "Launch build; sources reviewed August 13, 2026",
    steamAppId: "4246860",
    genres: ["Adventure", "Indie", "Simulation"],
    platforms: ["Windows PC", "macOS", "Steam"],
  },
  brand: {
    mark192: "/icon",
    mark512: "/icon",
    favicon: "/icon",
    appleIcon: "/apple-icon",
    defaultOgImage: "/og.png",
    manifestDescription:
      "Independent Security 51 guides for checkpoint procedure, anomalies, testing, quarantine, and the launch walkthrough.",
    colors: {background: "#07100d", theme: "#9cd93b"},
  },
  links: {
    steam: "https://store.steampowered.com/app/4246860/Security_51/",
    repository: "https://github.com/lew593963-blip/security51guide",
  },
  integrations: {
    analytics: {enabled: false},
    adsense: {enabled: false},
    adsterra: {enabled: false},
  },
});
