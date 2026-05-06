import { SitemapStream, streamToPromise } from "sitemap";
import { writeFile } from "fs/promises";
import fetch from "node-fetch";

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";
const SITE_URL = "https://www.gotocentralasia.com";
const PAGE_SIZE = 100;

const staticPages = [
  "/",
  "/contact",
  "/visa-policy",
  "/about",
  "/booking-form",
  "/10-Best-Places-to-visit-in-Uzbekistan",
];

const staticRoutes = [
  "/Uzbek-Tours",
  "/Kazakh-Tours",
  "/Kyrgyz-Tours",
  "/Tajik-Tours",
  "/Turkmen-Tours",
  "/Central-Asia-Tours",
  "/Silk-Road-Tours",
  "/Caucas-Tours",
  "/Armenia-Tours",
  "/Azerbaijan-Tours",
  "/Georgia-Tours",
  "/Uzbekistan",
  "/Kazakhstan",
  "/Kyrgyzstan",
  "/Tajikistan",
  "/Turkmenistan",
  "/Armenia",
  "/Azerbaijan",
  "/Georgia",
  "/Central-Asia",
  "/Silk-Road",
  "/Caucasus",
  "/City-Tours",
  "/Cultural-Tours",
  "/Gastronomy-Tours",
  "/Religious-Tours",
  "/Eco-Tours",
  "/Business-Mice-Tours",
  "/Transfer",
  "/hotels",
  "/Uzbekistan-Tashkent",
  "/Uzbekistan-Samarkand",
  "/Uzbekistan-Bukhara",
  "/Uzbekistan-Khiva",
  "/Kazakhstan-Astana",
  "/Kazakhstan-Almaty",
  "/Kyrgyzstan-Bishkek",
  "/Kyrgyzstan-Osh",
  "/Tajikistan-Dushanbe",
  "/Turkmenistan-Ashgabat",
  "/Azerbaijan-Baku",
  "/Georgia-Tbilisi",
  "/Armenia-Yerevan",
  "/Caucasus-Baku",
  "/Caucasus-Tbilisi",
  "/Caucasus-Yerevan",
  "/Uzbekistan-Private-Tours",
  "/Kazakhstan-Private-Tours",
  "/Silk-Road-Private-Tours",
  "/Central-Asia-Private-Tours",
  "/Kyrgyzstan-Private-Tours",
  "/Tajikistan-Private-Tours",
  "/Turkmenistan-Private-Tours",
  "/Armenia-Private-Tours",
  "/Azerbaijan-Private-Tours",
  "/Georgia-Private-Tours",
  "/Caucasus-Private-Tours",
];

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getRecordValue = (record, key) =>
  record?.[key] || record?.attributes?.[key];

const cleanPathSegment = (value = "") =>
  String(value).trim().replace(/^\/+|\/+$/g, "");

async function fetchCollection(collection, query = "") {
  const records = [];
  let page = 1;
  let pageCount = 1;

  do {
    const separator = query ? "&" : "?";
    const url = `${STRAPI}/api/${collection}${query}${separator}pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${collection} request failed with status ${res.status}`);
    }

    const data = await res.json();
    records.push(...(data.data || []));

    pageCount = data.meta?.pagination?.pageCount || 1;
    page += 1;
  } while (page <= pageCount);

  return records;
}

async function getDynamicTourRoutes() {
  try {
    const tours = await fetchCollection("asian-tours");

    return tours
      .map(
        (tour) =>
          getRecordValue(tour, "slug") ||
          getRecordValue(tour, "title") ||
          getRecordValue(tour, "Name"),
      )
      .filter(Boolean)
      .map((value) => `/tour/${toSlug(value)}`);
  } catch (error) {
    console.warn("⚠️ Skipping dynamic tour URLs in sitemap:", error.message);
    return [];
  }
}

async function getDynamicHotelRoutes() {
  try {
    const hotels = await fetchCollection("hotelss", "?populate=*");

    return hotels
      .map((hotel) => {
        const slug = getRecordValue(hotel, "slug");
        const title = getRecordValue(hotel, "title");

        return slug ? cleanPathSegment(slug) : toSlug(title);
      })
      .filter(Boolean)
      .map((value) => `/hotels/${value}`);
  } catch (error) {
    console.warn("⚠️ Skipping dynamic hotel URLs in sitemap:", error.message);
    return [];
  }
}

async function generate() {
  const sitemap = new SitemapStream({ hostname: SITE_URL });
  const [dynamicTourRoutes, dynamicHotelRoutes] = await Promise.all([
    getDynamicTourRoutes(),
    getDynamicHotelRoutes(),
  ]);

  const seenUrls = new Set();
  const writeUrl = (entry) => {
    if (seenUrls.has(entry.url)) return;
    seenUrls.add(entry.url);
    sitemap.write(entry);
  };

  staticPages.forEach((url) => {
    writeUrl({
      url,
      priority: 0.8,
      changefreq: "weekly",
      lastmodISO: new Date().toISOString(),
    });
  });

  staticRoutes.forEach((url) => {
    writeUrl({
      url,
      changefreq: "monthly",
      priority: 0.7,
      lastmodISO: new Date().toISOString(),
    });
  });

  dynamicTourRoutes.forEach((url) => {
    writeUrl({
      url,
      changefreq: "weekly",
      priority: 0.9,
      lastmodISO: new Date().toISOString(),
    });
  });

  dynamicHotelRoutes.forEach((url) => {
    writeUrl({
      url,
      changefreq: "weekly",
      priority: 0.8,
      lastmodISO: new Date().toISOString(),
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  await writeFile("./public/sitemap.xml", xml);

  console.log("✅ Sitemap generated successfully");
  console.log(`→ static pages: ${staticPages.length}`);
  console.log(`→ static routes: ${staticRoutes.length}`);
  console.log(`→ dynamic tour routes: ${dynamicTourRoutes.length}`);
  console.log(`→ dynamic hotel routes: ${dynamicHotelRoutes.length}`);
  console.log(`→ total URLs: ${seenUrls.size}`);
}

generate();
