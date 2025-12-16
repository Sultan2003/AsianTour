import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import fetch from "node-fetch";

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";

async function generate() {
  const sitemap = new SitemapStream({
    hostname: "https://www.gotocentralasia.com",
  });

  // 1) MAIN STATIC PAGES
  const staticPages = ["/", "/contact", "/search", "/visa-policy"];

  staticPages.forEach((url) => sitemap.write({ url, priority: 0.7 }));

  // 2) STATIC ROUTES (COUNTRIES, CITIES, TOUR TYPES, PRIVATE TOURS)
  const staticRoutes = [
    // ================= TOUR LIST PAGES =================
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

    // ================= DESTINATION (COUNTRY) PAGES =================
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

    // ================= TOUR TYPE PAGES =================
    "/City-Tours",
    "/Cultural-Tours",
    "/Gastronomy-Tours",
    "/Religious-Tours",
    "/Eco-Tours",
    "/Business-Mice-Tours",

    // ================= CITY PAGES =================
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

    // ================= CAUCASUS CITY ALIASES =================
    "/Caucasus-Baku",
    "/Caucasus-Tbilisi",
    "/Caucasus-Yerevan",

    // ================= PRIVATE TOUR PAGES =================
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

    // ================= OTHER STATIC CONTENT =================
    "/Asian-Tour-Transfer",
    "/about",
    "/contact",
    "/search",
    "/visa-policy",
    "/10-Best-Places-to-visit-in-Uzbekistan",
  ];

  staticRoutes.forEach((url) =>
    sitemap.write({
      url,
      changefreq: "monthly",
      priority: 0.8,
    })
  );

  // 3) DYNAMIC TOUR PAGES (FROM STRAPI)
  const res = await fetch(`${STRAPI}/api/asian-tours?pagination[limit]=500`);
  const data = await res.json();

  const tours = data.data || [];

  tours.forEach((tour) => {
    const title =
      tour.title || tour.attributes?.title || tour.attributes?.Name || "";

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    sitemap.write({
      url: `/tour/${slug}`,
      changefreq: "weekly",
      priority: 0.9,
    });
  });

  sitemap.end();
  const xml = await streamToPromise(sitemap);

  createWriteStream("./public/sitemap.xml").write(xml);

  console.log("✅ FULL sitemap generated with:");
  console.log(`→ ${staticPages.length} main pages`);
  console.log(`→ ${staticRoutes.length} static category pages`);
  console.log(`→ ${tours.length} dynamic tour pages`);
}

generate();
