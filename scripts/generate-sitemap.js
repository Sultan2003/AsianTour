import { SitemapStream, streamToPromise } from "sitemap";
import { readFile, writeFile, stat } from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";
import fetch from "node-fetch";
import { seoBlogPosts, seoTourPages } from "../src/seo/staticSeoPages.js";

const execFileAsync = promisify(execFile);

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";
const SITE_URL = "https://www.gotocentralasia.com";
const PAGE_SIZE = 100;
const BUILD_DATE = new Date();
const DEFAULT_LASTMOD = BUILD_DATE.toISOString();

const toAbsoluteUrl = (path) => `${SITE_URL}${path === "/" ? "" : path}`;
const toRussianPath = (path) => (path === "/" ? "/rus/" : `/rus${path}`);
const withLocaleLinks = (entry, englishPath = entry.url) => {
  const ruPath = toRussianPath(englishPath);
  return {
    ...entry,
    links: [
      { lang: "en", url: toAbsoluteUrl(englishPath) },
      { lang: "ru", url: toAbsoluteUrl(ruPath) },
      { lang: "x-default", url: toAbsoluteUrl(englishPath) },
    ],
  };
};

const fallbackDynamicTourSlugs = [
  "8-day-private-classic-uzbekistan-tour",
  "1-day-chimgan-and-charvak-tour",
  "6-day-private-classic-uzbekistan-tour",
  "1-day-samarkand-city-tour",
  "1-day-tashkent-city-tour",
  "10-day-private-classic-uzbekistan-tour",
  "8-day-private-uzbekistan-tour",
  "2-day-seven-holy-scholars-tour",
  "6-day-tashkent-samarkand-bukhara-tour",
  "5-day-tashkent-samarkand-tour",
  "5-day-tashkent-bukhara-tour",
  "5-day-tashkent-ferghana-valley-tour",
  "4-day-tashkent-samarkand-tour",
  "4-day-tashkent-mountains-tour",
  "welcome-to-uzbekistan-group-tour-2026-2027",
  "4-day-tashkent-bukhara-tour",
  "6-day-gastronomy-uzbekistan-tour",
  "8-day-classic-uzbekistan-group-tour-2026-2027",
  "10-day-uzbekistan-relaxed-group-tour-2026-2027",
  "1-day-bukhara-city-tour",
];

const fallbackDynamicHotelSlugs = [
  "airport-hotel-24",
  "corner-hotel",
  "human-hotel",
];

const staticEntries = [
  {
    url: "/",
    priority: 1,
    changefreq: "weekly",
    source: "src/pages/Main Page/index.jsx",
  },
  {
    url: "/contact",
    priority: 0.8,
    changefreq: "monthly",
    source: "src/pages/ContactUs/index.jsx",
  },
  {
    url: "/visa-policy",
    priority: 0.8,
    changefreq: "monthly",
    source: "src/pages/VisaPolicy/index.jsx",
  },
  {
    url: "/about",
    priority: 0.8,
    changefreq: "monthly",
    source: "src/pages/AboutUs/index.jsx",
  },
  {
    url: "/booking-form",
    priority: 0.8,
    changefreq: "monthly",
    source: "src/pages/BookingForm/index.jsx",
  },
  {
    url: "/10-best-places-to-visit-in-uzbekistan",
    priority: 0.8,
    changefreq: "monthly",
    source: "src/pages/10BestPlaces/index.jsx",
  },
  {
    url: "/uzbek-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Uzbekistan/index.jsx",
  },
  {
    url: "/kazakh-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Kazakhstan/index.jsx",
  },
  {
    url: "/kyrgyz-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Kyrgyzstan/index.jsx",
  },
  {
    url: "/tajik-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Tadjikistan/index.jsx",
  },
  {
    url: "/turkmen-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Turkmenistan/index.jsx",
  },
  {
    url: "/central-asia-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Central Asia/index.jsx",
  },
  {
    url: "/silk-road-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Silk Road/index.jsx",
  },
  {
    url: "/caucasus-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Caucasus/index.jsx",
  },
  {
    url: "/armenia-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Armenia/index.jsx",
  },
  {
    url: "/azerbaijan-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Azerbaijan/index.jsx",
  },
  {
    url: "/georgia-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Countries/Georgia/index.jsx",
  },
  {
    url: "/uzbekistan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Uzbekistan/index.jsx",
  },
  {
    url: "/kazakhstan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Kazakhstan/index.jsx",
  },
  {
    url: "/kyrgyzstan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Kyrgyzstan/index.jsx",
  },
  {
    url: "/tajikistan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Tadjikistan/index.jsx",
  },
  {
    url: "/turkmenistan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Turkmenistan/index.jsx",
  },
  {
    url: "/armenia",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Armenia/index.jsx",
  },
  {
    url: "/azerbaijan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Azerbaijan/index.jsx",
  },
  {
    url: "/georgia",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Georgia/index.jsx",
  },
  {
    url: "/central-asia",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Central Asia/index.jsx",
  },
  {
    url: "/silk-road",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Silk Road/index.jsx",
  },
  {
    url: "/caucasus",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Countries copy/Caucasus/index.jsx",
  },
  {
    url: "/city-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Tour Types/City Tours/index.jsx",
  },
  {
    url: "/cultural-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Tour Types/Cultural Tours/index.jsx",
  },
  {
    url: "/gastronomy-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Tour Types/Gastronomy Tours/index.jsx",
  },
  {
    url: "/religious-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Tour Types/Religious Tours/index.jsx",
  },
  {
    url: "/eco-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Tour Types/Eco Tours/index.jsx",
  },
  {
    url: "/business-mice-tours",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/pages/Tour Types/Business Tours/index.jsx",
  },
  {
    url: "/transfer",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Transfers/index.jsx",
  },
  {
    url: "/hotels",
    priority: 0.7,
    changefreq: "weekly",
    source: "src/components/HotelsList/index.jsx",
  },
  {
    url: "/uzbekistan-tashkent",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Uzbekistan/Tashkent/index.jsx",
  },
  {
    url: "/uzbekistan-samarkand",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Uzbekistan/Samarkand/index.jsx",
  },
  {
    url: "/uzbekistan-bukhara",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Uzbekistan/Bukhara/index.jsx",
  },
  {
    url: "/uzbekistan-khiva",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Uzbekistan/Khiva/index.jsx",
  },
  {
    url: "/kazakhstan-astana",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Kazakhstan/Astana/Astana/index.jsx",
  },
  {
    url: "/kazakhstan-almaty",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Almaty/index.jsx",
  },
  {
    url: "/kyrgyzstan-bishkek",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Bishkek/index.jsx",
  },
  {
    url: "/kyrgyzstan-osh",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Osh/index.jsx",
  },
  {
    url: "/tajikistan-dushanbe",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Dushanbe/index.jsx",
  },
  {
    url: "/turkmenistan-ashgabat",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Ashgabat/index.jsx",
  },
  {
    url: "/azerbaijan-baku",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Baku/index.jsx",
  },
  {
    url: "/georgia-tbilisi",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Tbilisi/index.jsx",
  },
  {
    url: "/armenia-yerevan",
    priority: 0.7,
    changefreq: "monthly",
    source: "src/pages/Cities/Erevan/index.jsx",
  },
  {
    url: "/caucasus-baku",
    priority: 0.6,
    changefreq: "monthly",
    source: "src/pages/Cities/Baku/index.jsx",
  },
  {
    url: "/caucasus-tbilisi",
    priority: 0.6,
    changefreq: "monthly",
    source: "src/pages/Cities/Tbilisi/index.jsx",
  },
  {
    url: "/caucasus-yerevan",
    priority: 0.6,
    changefreq: "monthly",
    source: "src/pages/Cities/Erevan/index.jsx",
  },
  {
    url: "/uzbekistan-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Uzbekistan/index.jsx",
  },
  {
    url: "/kazakhstan-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Kazakhstan/index.jsx",
  },
  {
    url: "/silk-road-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Silk Road/index.jsx",
  },
  {
    url: "/central-asia-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Central Asia Private/index.jsx",
  },
  {
    url: "/kyrgyzstan-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Kyrgyzstan Private/index.jsx",
  },
  {
    url: "/tajikistan-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Tajikistan Private/index.jsx",
  },
  {
    url: "/turkmenistan-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Turkmenistan Private/index.jsx",
  },
  {
    url: "/armenia-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Armenia Private/index.jsx",
  },
  {
    url: "/azerbaijan-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Azerbaijan Private/index.jsx",
  },
  {
    url: "/georgia-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Georgia Private/index.jsx",
  },
  {
    url: "/caucasus-private-tours",
    priority: 0.75,
    changefreq: "weekly",
    source: "src/pages/Private Tours/Caucasus Private/index.jsx",
  },
  ...seoBlogPosts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: 0.65,
    changefreq: "monthly",
    source: "src/seo/staticSeoPages.js",
  })),
];

const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getRecordValue = (record, key) =>
  record?.[key] || record?.attributes?.[key];

function extractSitemapEntries(xml, pathnamePrefix, defaults) {
  const entries = [];
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];

  urlBlocks.forEach((block) => {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];

    if (!loc?.startsWith(`${SITE_URL}${pathnamePrefix}`)) return;

    const url = loc.replace(SITE_URL, "").toLowerCase();
    entries.push({
      url,
      lastmodISO: lastmod || DEFAULT_LASTMOD,
      ...defaults,
    });
  });

  return entries;
}

async function readCurrentSitemapXml() {
  try {
    return await readFile("./public/sitemap.xml", "utf8");
  } catch {
    return "";
  }
}

async function readGitSitemapXml() {
  try {
    const { stdout } = await execFileAsync("git", ["show", "HEAD:public/sitemap.xml"]);
    return stdout;
  } catch {
    return "";
  }
}


function buildFallbackDynamicEntries(pathnamePrefix, slugs, defaults) {
  return slugs.map((slug) => ({
    url: `${pathnamePrefix}${slug}`,
    lastmodISO: DEFAULT_LASTMOD,
    ...defaults,
  }));
}

async function getPreviousDynamicEntries(pathnamePrefix, defaults) {
  const currentEntries = extractSitemapEntries(
    await readCurrentSitemapXml(),
    pathnamePrefix,
    defaults,
  );

  if (currentEntries.length) return currentEntries;

  const gitEntries = extractSitemapEntries(
    await readGitSitemapXml(),
    pathnamePrefix,
    defaults,
  );

  if (gitEntries.length) return gitEntries;

  return buildFallbackDynamicEntries(
    pathnamePrefix,
    pathnamePrefix === "/tour/" ? fallbackDynamicTourSlugs : fallbackDynamicHotelSlugs,
    defaults,
  );
}

const getRecordLastmod = (record) =>
  getRecordValue(record, "updatedAt") ||
  getRecordValue(record, "publishedAt") ||
  getRecordValue(record, "createdAt") ||
  DEFAULT_LASTMOD;

async function getFileLastmod(source) {
  try {
    const { stdout } = await execFileAsync("git", [
      "log",
      "-1",
      "--format=%cI",
      "--",
      source,
    ]);
    const gitDate = stdout.trim();

    if (gitDate) return gitDate;
  } catch {
    // Fall back to file modified time when git history is unavailable.
  }

  try {
    const fileStat = await stat(source);
    return fileStat.mtime.toISOString();
  } catch {
    return DEFAULT_LASTMOD;
  }
}

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

async function getDynamicTourEntries() {
  try {
    const tours = await fetchCollection("asian-tours");

    return tours
      .map((tour) => {
        const slugSource =
          getRecordValue(tour, "slug") ||
          getRecordValue(tour, "title") ||
          getRecordValue(tour, "Name");

        if (!slugSource) return null;

        return {
          url: `/tour/${toSlug(slugSource)}`,
          changefreq: "weekly",
          priority: 0.9,
          lastmodISO: getRecordLastmod(tour),
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("⚠️ Falling back to existing dynamic tour URLs in sitemap:", error.message);
    return getPreviousDynamicEntries("/tour/", {
      changefreq: "weekly",
      priority: 0.9,
    });
  }
}

async function getDynamicHotelEntries() {
  try {
    const hotels = await fetchCollection("hotelss", "?populate=*");

    return hotels
      .map((hotel) => {
        const slugSource = getRecordValue(hotel, "slug") || getRecordValue(hotel, "title");

        if (!slugSource) return null;

        return {
          url: `/hotels/${toSlug(slugSource)}`,
          changefreq: "weekly",
          priority: 0.8,
          lastmodISO: getRecordLastmod(hotel),
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.warn("⚠️ Falling back to existing dynamic hotel URLs in sitemap:", error.message);
    return getPreviousDynamicEntries("/hotels/", {
      changefreq: "weekly",
      priority: 0.8,
    });
  }
}

async function getStaticEntriesWithLastmod() {
  return Promise.all(
    staticEntries.map(async ({ source, ...entry }) => ({
      ...entry,
      lastmodISO: await getFileLastmod(source),
    })),
  );
}

async function generate() {
  const sitemap = new SitemapStream({ hostname: SITE_URL });
  const [staticRoutes, dynamicTourRoutes, dynamicHotelRoutes] = await Promise.all([
    getStaticEntriesWithLastmod(),
    getDynamicTourEntries(),
    getDynamicHotelEntries(),
  ]);

  seoTourPages.forEach((tour) => {
    dynamicTourRoutes.push({
      url: `/tour/${tour.slug}`,
      changefreq: "weekly",
      priority: 0.9,
      lastmodISO: DEFAULT_LASTMOD,
    });
  });

  const seenUrls = new Set();
  const writeUrl = (entry) => {
    if (seenUrls.has(entry.url)) return;
    seenUrls.add(entry.url);
    sitemap.write(entry);
  };

  [...staticRoutes, ...dynamicTourRoutes, ...dynamicHotelRoutes].forEach((entry) => {
    writeUrl(withLocaleLinks(entry));
    writeUrl(withLocaleLinks({ ...entry, url: toRussianPath(entry.url) }, entry.url));
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  await writeFile("./public/sitemap.xml", xml);

  console.log("✅ Sitemap generated successfully");
  console.log(`→ static routes: ${staticRoutes.length}`);
  console.log(`→ dynamic tour routes: ${dynamicTourRoutes.length}`);
  console.log(`→ dynamic hotel routes: ${dynamicHotelRoutes.length}`);
  console.log(`→ total URLs: ${seenUrls.size}`);
}

generate();
