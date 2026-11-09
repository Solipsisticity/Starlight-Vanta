export const SITE_URL = "https://vanta.starsolenterprise.com";
export const SITE_NAME = "Starlight Vanta";

export const PAGE_META = {
  "/": {
    title: "Starlight Vanta — username generator that runs in your browser",
    description:
      "Build pronounceable, genuinely uncommon usernames from phonetic rules rather than a word list. Everything is generated on your own device; nothing you make is uploaded.",
  },
  "/generator": {
    title: "Username generator",
    description:
      "Tune register, length, structure and casing, then generate twelve scored usernames at a time. Everything runs locally in your browser.",
  },
  "/collections": {
    title: "Collections",
    description:
      "Pre-tuned sets of usernames: three and four letter names, invented words, celestial roots, darker registers and more.",
  },
  "/presets": {
    title: "Presets",
    description:
      "Eight saved configurations for the Starlight Vanta generator, from four-letter rarities to invented words and competitive tags.",
  },
  "/builder": {
    title: "Builder",
    description:
      "Assemble a username by hand from a head, a core word and an ending, and see its rarity and readability scores update as you type.",
  },
  "/saved": {
    title: "Saved names",
    description: "Your bookmarked usernames and recent generation history, held in this browser only.",
    noindex: true,
  },
  "/settings": {
    title: "Settings",
    description: "Motion, sound, history retention and what Starlight Vanta stores in your browser.",
    noindex: true,
  },
  "/donate": {
    title: "Donate",
    description:
      "Starlight Vanta is free, has no accounts and runs no advertising. Contributions cover hosting and are processed by Stripe.",
  },
  "/privacy": {
    title: "Privacy policy",
    description:
      "What Starlight Vanta stores, what the anonymous generation counter records, and how donations are handled. No accounts, no advertising, no analytics.",
  },
  "/terms": {
    title: "Terms of service",
    description:
      "The terms covering use of Starlight Vanta, ownership of the generator, what a generated name does and does not come with, and how donations are treated.",
  },
  "/cookies": {
    title: "Cookie policy",
    description:
      "Every cookie and browser storage value Starlight Vanta can use: local preferences, saved names, and Stripe payment cookies and possible security cookies.",
  },
  "/404": {
    title: "Page not found",
    description: "That address does not exist on Starlight Vanta.",
    noindex: true,
  },
};

export const INDEXABLE_ROUTES = Object.entries(PAGE_META)
  .filter(([path, meta]) => !meta.noindex && path !== "/404")
  .map(([path]) => path);

export function resolveMeta(path) {
  const meta = PAGE_META[path] || PAGE_META["/404"];
  return {
    ...meta,
    path,
    fullTitle: path === "/" ? meta.title : `${meta.title} · ${SITE_NAME}`,
    url: `${SITE_URL}${path === "/" ? "/" : path}`,
  };
}

export const SITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description: "A username generator that builds pronounceable, uncommon names from phonetic rules entirely inside the browser.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": `${SITE_URL}/#publisher` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#publisher`,
      name: "Starlight Solutions",
      url: "https://www.starsolenterprise.com/",
    },
  ],
};

export function pageMetadata(path) {
  const meta = resolveMeta(path);
  const index = !meta.noindex;
  return {
    title: { absolute: meta.fullTitle },
    description: meta.description,
    alternates: path === "/404" ? undefined : { canonical: meta.url },
    robots: { index, follow: true, googleBot: { index, follow: true, "max-image-preview": "large" } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: meta.fullTitle,
      description: meta.description,
      url: meta.url,
    },
    twitter: { card: "summary_large_image", title: meta.fullTitle, description: meta.description },
  };
}
