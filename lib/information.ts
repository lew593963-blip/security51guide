import type {Locale} from "@/i18n/routing";

export type InformationContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{title: string; body: string}>;
  cta: string;
};

export const aboutContent: Record<Locale, InformationContent> = {
  en: {
    eyebrow: "Independent Fan Resource",
    title: "About Security 51 Guide",
    intro:
      "Security 51 Guide answers current player questions while keeping official facts, full-release observations, practical recommendations, and unresolved unknowns visibly separate.",
    sections: [
      {
        title: "What we cover",
        body: "The first library covers checkpoint procedure, anomaly screening, medical tests, quarantine decisions, and the launch progression through Day 30. Overlapping document and clearance intent is merged into one checkpoint guide. Exact ending and achievement conditions remain deferred until current-build evidence is strong enough.",
      },
      {
        title: "How evidence is graded",
        body: "The current Steam listing, Alawar's official game page, and official Steam announcements establish the game's systems. Current-build walkthrough observations may establish tool unlocks and example daily rules, but randomized visitors and changing bulletins are labeled. A competitor's unsupported theory never becomes a fact here.",
      },
      {
        title: "Independent status",
        body: "This is an independent fan-made guide site. It is not affiliated with, endorsed by, or operated by Alawar, Valve, Steam, or another guide publisher. Names, screenshots, and marks belong to their respective owners and are used only to identify and discuss the game.",
      },
      {
        title: "Corrections and updates",
        body: "Security 51 launched on August 12, 2026, so patches and branching discoveries may change what players observe. Every guide shows a review date and source boundary. A useful correction includes the page, shift or branch, current build, and a reliable source or reproducible observation.",
      },
    ],
    cta: "Read the Checkpoint Guide",
  },
};

export const contactContent: Record<Locale, InformationContent> = {
  en: {
    eyebrow: "Corrections & Feedback",
    title: "Contact Security 51 Guide",
    intro:
      "Use the public project repository for factual corrections, changed shift rules, broken links, accessibility feedback, or privacy requests. The site does not operate a contact form or publish an unverified email address.",
    sections: [
      {
        title: "Report a guide problem",
        body: "Include the page URL, exact statement, shift or branching-timeline state, current game build, and a reliable source or reproducible observation. Do not paste another publisher's guide or upload copyrighted content you do not control.",
      },
      {
        title: "Privacy or accessibility requests",
        body: "Use the same project channel for privacy or accessibility feedback. Do not publish account credentials, analytics identifiers, payment information, save files containing personal data, or other sensitive information in a public issue.",
      },
      {
        title: "What this site cannot handle",
        body: "Security 51 Guide cannot provide Steam account support, refunds, official bug fixes, moderation, or publisher support. Use the Steam listing and Alawar's official channels for game or purchase assistance.",
      },
    ],
    cta: "Open the Project Repository",
  },
};
