const SITE_NAME = "Go To Central Asia";
const SITE_URL = "https://www.gotocentralasia.com";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

const routeSeoMap = {
  "/": {
    title: "Central Asia & Silk Road Tours | Go To Central Asia",
    description:
      "Plan private and group tours across Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and the Caucasus with local travel experts.",
    keywords:
      "Central Asia tours, Silk Road tours, Uzbekistan travel, Caucasus tours, private tours",
  },
  "/contact": {
    title: "Contact Go To Central Asia | Tailor-Made Tour Support",
    description:
      "Contact our travel specialists to plan your custom Central Asia itinerary, visa support, transportation, and local experiences.",
    keywords: "contact travel agency, Central Asia trip planning, tour support",
  },
  "/about": {
    title: "About Go To Central Asia | Regional Tour Experts",
    description:
      "Learn about our local team, destination expertise, and mission to deliver authentic and reliable travel experiences across Asia.",
    keywords: "about travel company, Central Asia experts, local guides",
  },
  "/visa-policy": {
    title: "Central Asia Visa Policy Guide | Go To Central Asia",
    description:
      "Review visa requirements and practical entry information for Central Asia and Caucasus destinations before your trip.",
    keywords: "visa policy Central Asia, travel visa requirements, entry rules",
  },
  "/booking-form": {
    title: "Book Your Tour | Go To Central Asia",
    description:
      "Submit your booking request for private, cultural, and multi-country Central Asia travel programs.",
    keywords: "book tour, private tour booking, Central Asia holidays",
  },
  "/search": {
    title: "Search Tours | Go To Central Asia",
    description:
      "Find tours and destinations across Central Asia and the Caucasus.",
    keywords: "tour search, Central Asia tours",
    robots: "noindex,follow",
  },
  "/10-Best-Places-to-visit-in-Uzbekistan": {
    title: "10 Best Places to Visit in Uzbekistan | Travel Guide",
    description:
      "Discover the top places to visit in Uzbekistan, including Samarkand, Bukhara, Khiva, and Tashkent for your next journey.",
    keywords: "best places in Uzbekistan, Uzbekistan travel guide, Samarkand, Bukhara, Khiva",
    type: "article",
  },
};

const formatSegment = (segment) =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const buildFallbackSeo = (pathname) => {
  if (pathname.startsWith("/tour/")) {
    const slug = pathname.replace("/tour/", "");
    const tourName = formatSegment(slug);

    return {
      title: `${tourName} | ${SITE_NAME}`,
      description: `Explore itinerary details, inclusions, and booking options for ${tourName} with ${SITE_NAME}.`,
      keywords: `${tourName}, Central Asia itinerary, guided tour, travel package`,
      type: "article",
    };
  }

  if (pathname.startsWith("/Private-tour/")) {
    const slug = pathname.replace("/Private-tour/", "");
    const tourName = formatSegment(slug);

    return {
      title: `${tourName} Private Tour | ${SITE_NAME}`,
      description: `View the full program and customization options for ${tourName} private tour package.`,
      keywords: `${tourName}, private tours, tailor-made travel, Central Asia`,
      type: "article",
    };
  }

  if (pathname.startsWith("/weather/")) {
    const countrySlug = pathname.replace("/weather/", "");
    const destination = formatSegment(countrySlug);

    return {
      title: `${destination} Weather Forecast | ${SITE_NAME}`,
      description: `Check current and upcoming weather trends for ${destination} to better plan your travel dates.`,
      keywords: `${destination} weather, climate, best season to travel`,
    };
  }

  const readable = pathname
    .split("/")
    .filter(Boolean)
    .map(formatSegment)
    .join(" | ");

  return {
    title: readable ? `${readable} | ${SITE_NAME}` : `${SITE_NAME}`,
    description:
      "Explore destinations, tour styles, travel tips, and booking options for Central Asia and nearby regions.",
    keywords: "travel, tours, Central Asia, itinerary",
  };
};

const getBreadcrumbs = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);

  return parts.map((part, index) => {
    const url = `${SITE_URL}/${parts.slice(0, index + 1).join("/")}`;

    return {
      name: formatSegment(part),
      item: url,
    };
  });
};

export const getSeoData = (pathname) => {
  const page = routeSeoMap[pathname] || buildFallbackSeo(pathname);
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const breadcrumbs = getBreadcrumbs(pathname);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.item,
        })),
      }
    : null;

  return {
    ...page,
    siteName: SITE_NAME,
    canonical,
    image: page.image || DEFAULT_IMAGE,
    type: page.type || "website",
    robots: page.robots || "index,follow,max-image-preview:large",
    schemas: [organizationSchema, websiteSchema, breadcrumbSchema].filter(Boolean),
  };
};
