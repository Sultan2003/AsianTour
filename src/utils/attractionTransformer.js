const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "";

export const getMediaUrl = (url) => {
  if (!url) return "/fallback-attraction.jpg";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

export const normalizeCategories = (categories) => {
  if (!categories) return [];
  if (Array.isArray(categories)) return categories.filter(Boolean);
  if (typeof categories === "string") {
    return categories.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export const normalizeDescription = (description) => {
  if (!description) return [];
  if (Array.isArray(description)) return description;
  if (typeof description === "string") {
    return description.split("\n\n").map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

const extractEntity = (input) => {
  if (Array.isArray(input?.data)) return input.data[0] || null;
  return input?.data || input || null;
};

export function transformStrapiAttraction(strapiResponse) {
  const entry = extractEntity(strapiResponse);
  const raw = entry?.attributes || entry || {};

  const media = (field) => {
    const item = raw?.[field];
    if (!item) return null;
    const mediaData = item?.data || item;
    const attrs = mediaData?.attributes || mediaData;
    if (!attrs?.url) return null;
    return {
      url: getMediaUrl(attrs.url),
      alternativeText: attrs?.alternativeText || "",
      caption: attrs?.caption || "",
    };
  };

  const mediaArray = (field) => {
    const list = raw?.[field]?.data || raw?.[field] || [];
    if (!Array.isArray(list)) return [];
    return list
      .map((item, index) => {
        const attrs = item?.attributes || item;
        if (!attrs?.url) return null;
        return {
          id: item?.id || attrs?.id || `${field}-${index}`,
          url: getMediaUrl(attrs.url),
          caption: attrs?.caption || attrs?.alternativeText || "",
        };
      })
      .filter(Boolean);
  };

  return {
    id: entry?.id || raw?.id,
    title: raw?.title || "Untitled Attraction",
    slug: raw?.slug || "",
    country: raw?.country || "",
    city: raw?.city || "",
    subtitle: raw?.subtitle || "",
    shortDescription: raw?.shortDescription || "",
    description: normalizeDescription(raw?.description),
    heroImage: media("heroImage"),
    gallery: mediaArray("gallery"),
    categories: normalizeCategories(raw?.categories),
    bestTime: raw?.bestTime || "",
    duration: raw?.duration || "",
    entranceFee: raw?.entranceFee || "",
    openingHours: raw?.openingHours || "",
    coordinates: raw?.coordinates ? { lat: Number(raw.coordinates.lat), lng: Number(raw.coordinates.lng) } : null,
    faq: (raw?.faq || []).map((item, index) => ({ id: item?.id || index, question: item?.question || "", answer: item?.answer || "" })),
    stats: (raw?.stats || []).map((item, index) => ({ id: item?.id || index, value: item?.value || "", label: item?.label || "" })),
    nearbyAttractions: (raw?.nearbyAttractions?.data || raw?.nearbyAttractions || []).map((item) => {
      const attrs = item?.attributes || item;
      const hero = attrs?.heroImage?.data?.attributes || attrs?.heroImage?.attributes || attrs?.heroImage;
      return {
        id: item?.id || attrs?.id,
        title: attrs?.title || "",
        slug: attrs?.slug || "",
        description: attrs?.shortDescription || "",
        image: hero?.url ? { url: getMediaUrl(hero.url) } : null,
      };
    }),
    metaTitle: raw?.metaTitle || raw?.title || "",
    metaDescription: raw?.metaDescription || raw?.shortDescription || "",
    ctaTitle: raw?.ctaTitle || "",
    ctaSubtitle: raw?.ctaSubtitle || "",
  };
}
