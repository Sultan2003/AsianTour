import { SITE_URL, getAlternateUrls, getCanonicalUrl, normalizePathname, splitLocalePathname } from "./canonical";
import { getSeoBlogPost, seoTourPages } from "./staticSeoPages";
import { staticRouteSeo } from "./staticRouteSeo";

const SITE_NAME = "Go To Central Asia";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const TWITTER_SITE = "@gotocentralasia";

const routeSeoMap = staticRouteSeo;

const formatSegment = (segment) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const buildFallbackSeo = (pathname) => {
  if (pathname.startsWith("/tour/")) {
    const slug = pathname.replace("/tour/", "");
    const tour = seoTourPages.find((item) => item.slug === slug);
    const tourName = tour?.h1 || formatSegment(slug);

    return {
      title: tour?.title || `${tourName} | ${SITE_NAME}`,
      description:
        tour?.description ||
        `Explore itinerary details, inclusions, and booking options for ${tourName} with ${SITE_NAME}.`,
      type: "article",
      tour,
    };
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    const post = getSeoBlogPost(slug);

    if (post) {
      return {
        title: post.title,
        description: post.description,
        type: "article",
      };
    }
  }

  if (pathname.startsWith("/private-tour/")) {
    const slug = pathname.replace("/private-tour/", "");
    const tourName = formatSegment(slug);

    return {
      title: `${tourName} Private Tour | ${SITE_NAME}`,
      description: `View the full program and customization options for ${tourName} private tour package.`,
      type: "article",
    };
  }

  if (pathname.startsWith("/hotels/")) {
    const hotelSlug = pathname.replace("/hotels/", "");
    const hotelName = formatSegment(hotelSlug);

    return {
      title: `${hotelName} Hotel | ${SITE_NAME}`,
      description: `View rooms, terms of stay, contact details, and booking information for ${hotelName}.`,
      type: "article",
    };
  }

  if (pathname.startsWith("/weather/")) {
    const countrySlug = pathname.replace("/weather/", "");
    const destination = formatSegment(countrySlug);

    return {
      title: `${destination} Weather Forecast | ${SITE_NAME}`,
      description: `Check current and upcoming weather trends for ${destination} to better plan your travel dates.`,
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
  const normalizedPathname = normalizePathname(pathname);
  const { isRussian, pathname: routePathname } = splitLocalePathname(normalizedPathname);
  const page =
    routeSeoMap[routePathname] || buildFallbackSeo(routePathname);
  const canonical = getCanonicalUrl(normalizedPathname);
  const alternates = getAlternateUrls(normalizedPathname);
  const breadcrumbs = getBreadcrumbs(routePathname);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
  };

  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_IMAGE,
    description: "Tour operator for Silk Road & Central Asia tours",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Russian"],
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
  };

  const touristTripSchema = page.tour
    ? {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: page.tour.h1,
        description: page.tour.description,
        touristType: ["Cultural travelers", "Silk Road travelers"],
        offers: {
          "@type": "Offer",
          price: page.tour.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        provider: travelAgencySchema,
      }
    : null;

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
    alternates,
    locale: isRussian ? "ru_RU" : "en_US",
    htmlLang: isRussian ? "ru" : "en",
    image: page.image || DEFAULT_IMAGE,
    type: page.type || "website",
    robots: page.robots || "index,follow,max-image-preview:large",
    twitterSite: TWITTER_SITE,
    schemas: [
      organizationSchema,
      websiteSchema,
      routePathname === "/" ? travelAgencySchema : null,
      routePathname === "/" ? localBusinessSchema : null,
      touristTripSchema,
      breadcrumbSchema,
    ].filter(Boolean),
  };
};
