import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import fetch from "node-fetch";

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";
const SITE_URL = "https://www.gotocentralasia.com";

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
  "/Asian-Tour-Transfer",
];

const toSlug = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function getDynamicTourRoutes() {
  try {
    const res = await fetch(`${STRAPI}/api/asian-tours?pagination[limit]=500`, {
      timeout: 15000,
    });

    if (!res.ok) {
      throw new Error(`Strapi request failed with status ${res.status}`);
    }

    const data = await res.json();
    const tours = data.data || [];

    return tours
      .map((tour) => tour.title || tour.attributes?.title || tour.attributes?.Name)
      .filter(Boolean)
      .map((title) => `/tour/${toSlug(title)}`);
  } catch (error) {
    console.warn("⚠️ Skipping dynamic tour URLs in sitemap:", error.message);
    return [];
  }
}

async function generate() {
  const sitemap = new SitemapStream({ hostname: SITE_URL });
  const dynamicRoutes = await getDynamicTourRoutes();

  staticPages.forEach((url) => {
    sitemap.write({
      url,
      priority: 0.8,
      changefreq: "weekly",
      lastmodISO: new Date().toISOString(),
    });
  });

  staticRoutes.forEach((url) => {
    sitemap.write({
      url,
      changefreq: "monthly",
      priority: 0.7,
      lastmodISO: new Date().toISOString(),
    });
  });

  dynamicRoutes.forEach((url) => {
    sitemap.write({
      url,
      changefreq: "weekly",
      priority: 0.9,
      lastmodISO: new Date().toISOString(),
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  createWriteStream("./public/sitemap.xml").write(xml);

  console.log("✅ Sitemap generated successfully");
  console.log(`→ static pages: ${staticPages.length}`);
  console.log(`→ static routes: ${staticRoutes.length}`);
  console.log(`→ dynamic routes: ${dynamicRoutes.length}`);
}

generate();
