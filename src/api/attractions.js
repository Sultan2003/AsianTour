import { transformStrapiAttraction } from "../utils/attractionTransformer";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "https://brilliant-passion-7d3870e44b.strapiapp.com";

const POPULATE_QUERY = [
  "populate[heroImage]=*",
  "populate[gallery]=*",
  "populate[faq]=*",
  "populate[stats]=*",
  "populate[nearbyAttractions][populate][heroImage]=*",
].join("&");

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchAttractionBySlug(slug) {
  const qs = `filters[slug][$eq]=${encodeURIComponent(slug)}&${POPULATE_QUERY}`;
  const url = `${STRAPI_URL}/api/attractions?${qs}`;
  const data = await fetchJson(url);
  return transformStrapiAttraction(data);
}

export async function fetchAttractionsList({ country, city, category, page = 1, pageSize = 12, sort = "title:asc" } = {}) {
  const params = [POPULATE_QUERY, `pagination[page]=${page}`, `pagination[pageSize]=${pageSize}`, `sort=${encodeURIComponent(sort)}`];
  if (country) params.push(`filters[country][$eqi]=${encodeURIComponent(country)}`);
  if (city) params.push(`filters[city][$eqi]=${encodeURIComponent(city)}`);
  if (category) params.push(`filters[categories][$containsi]=${encodeURIComponent(category)}`);
  const url = `${STRAPI_URL}/api/attractions?${params.join("&")}`;
  const data = await fetchJson(url);
  return {
    items: (data?.data || []).map((item) => transformStrapiAttraction(item)),
    pagination: data?.meta?.pagination || null,
  };
}
