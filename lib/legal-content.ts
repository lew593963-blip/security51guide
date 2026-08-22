import type {Locale} from "@/i18n/routing";

export type LegalContent = {
  updated: string;
  privacyTitle: string;
  privacyIntro: string;
  privacySections: Array<{title: string; body: string}>;
  termsTitle: string;
  termsIntro: string;
  termsSections: Array<{title: string; body: string}>;
  contactLabel: string;
};

export const legalContent: Record<Locale, LegalContent> = {
  en: {
    updated: "Last updated: August 22, 2026",
    privacyTitle: "Privacy Policy",
    privacyIntro:
      "This policy explains how the independent Security 51 Guide handles technical delivery, local browser storage, external links, and consent-gated analytics and advertising.",
    privacySections: [
      {
        title: "Information collected",
        body: "The site has no user accounts, comments, checkout, newsletter, upload feature, or contact form. Its hosting provider may process standard request data such as IP address, browser, requested URL, and time for security, reliability, abuse prevention, and delivery.",
      },
      {
        title: "Browser storage and consent",
        body: "Necessary local browser storage remembers whether you accepted or rejected optional services. Google Analytics 4 and Adsterra do not load until you accept optional analytics and advertising. If you reject or select Necessary only, their scripts and placements remain disabled. You can reopen Privacy choices from the footer and change your selection.",
      },
      {
        title: "Analytics and advertising status",
        body: "After consent, Google Analytics 4 measures visits and page interactions for site performance and content improvement, while Adsterra may load a native advertising placement on guide pages. These providers may process online identifiers, device and browser information, page URLs, approximate location, and interaction data under their own policies. Google AdSense is not enabled.",
      },
      {
        title: "External links and media",
        body: "Links and media from Steam, GitHub, and Alawar are governed by those services' own policies. Following a link or loading third-party media may allow that provider to receive standard request and account information under its terms.",
      },
    ],
    termsTitle: "Terms of Service",
    termsIntro:
      "By using Security 51 Guide, you agree to these terms for an independent fan-made information resource.",
    termsSections: [
      {
        title: "Independent fan resource",
        body: "Security 51 Guide is not affiliated with, endorsed by, or operated by Alawar, Valve, Steam, GitHub, or another guide publisher. Game names, screenshots, and marks belong to their respective owners.",
      },
      {
        title: "Information and evidence limits",
        body: "Guides are provided for general informational purposes. Official facts are separated from current-build community observations, practical advice, and documented unknowns, but patches, randomized visitors, and branching context can make a reviewed page incomplete or inaccurate.",
      },
      {
        title: "Acceptable use",
        body: "You may read and link to the site for lawful purposes. Do not disrupt the service, bypass security, misrepresent an official affiliation, scrape in a way that harms availability, or republish the site's original presentation as your own.",
      },
      {
        title: "External services and future integrations",
        body: "The site contains external links and media and, only after optional consent, may load Google Analytics 4 and an Adsterra native advertising placement. Security 51 Guide does not control external content, purchases, accounts, availability, or privacy practices, and a link or advertisement is not an endorsement.",
      },
      {
        title: "Changes and contact",
        body: "Content, features, and these terms may change as the game and site evolve. Use the Contact page to report a factual, legal, accessibility, or privacy concern.",
      },
    ],
    contactLabel: "Contact Security 51 Guide",
  },
};
