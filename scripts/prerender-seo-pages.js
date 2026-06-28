import { readFile, writeFile, mkdir } from "fs/promises";
import { seoBlogPosts, seoCountryPages, seoTourPages } from "../src/seo/staticSeoPages.js";

const SITE_URL = "https://www.gotocentralasia.com";
const template = await readFile("dist/index.html", "utf8");

const escapeHtml = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (html = "") => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function inject({ path, title, description, h1, body, schema }) {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const content = `<section id="seo-prerendered-content"><h1>${escapeHtml(h1)}</h1>${body.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</section>`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
  return html;
}

async function writeRoute(path, html) {
  const dir = path === "/" ? "dist" : `dist${path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
}

const pages = [];

pages.push({
  path: "/",
  title: "Silk Road & Central Asia Tours | Go To Central Asia",
  description: "Book private and group Central Asia tours across Uzbekistan, Kyrgyzstan, Kazakhstan, Tajikistan and Turkmenistan with local experts.",
  h1: "Central Asia Tours and Silk Road Travel Packages",
  body: [
    "Go To Central Asia plans private and group tours across Uzbekistan, Kyrgyzstan, Kazakhstan, Tajikistan, Turkmenistan and the Caucasus. Our travel specialists design Silk Road itineraries with reliable hotels, licensed guides, airport transfers, rail tickets and practical local support.",
    "Popular journeys include Uzbekistan cultural tours, Kyrgyzstan mountain itineraries, Kazakhstan city and nature programs, Turkmenistan desert routes and multi-country Central Asia packages. Whether you want a scheduled group departure or a tailor-made private tour, the team helps match dates, pace and budget to the right route.",
  ],
  schema: { "@context": "https://schema.org", "@type": "LocalBusiness", name: "Go To Central Asia", url: SITE_URL, image: `${SITE_URL}/logo.png`, address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" } },
});

for (const tour of seoTourPages) {
  pages.push({
    path: `/tour/${tour.slug}`,
    title: tour.title,
    description: tour.description,
    h1: tour.h1,
    body: [...tour.body, `Highlights include ${tour.highlights.join(", ")}.`],
    schema: { "@context": "https://schema.org", "@type": "TouristTrip", name: tour.h1, description: strip(tour.body.join(" ")).slice(0, 500), offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "TravelAgency", name: "Go To Central Asia", url: SITE_URL }, url: `${SITE_URL}/tour/${tour.slug}` },
  });
}

for (const country of seoCountryPages) {
  pages.push({
    path: country.path,
    title: `${country.name} Tours & Travel Guide | Go To Central Asia`,
    description: `${country.summary} Book guided ${country.name} tours with Go To Central Asia.`.slice(0, 158),
    h1: country.keyword,
    body: [country.summary, `${country.name} pages include practical route ideas, recommended tour styles, seasonal advice and destination highlights for travelers comparing Central Asia packages. Our team can arrange guides, transfers, hotels and extensions so your itinerary is clear before arrival.`],
    schema: { "@context": "https://schema.org", "@type": "TouristDestination", name: country.name, description: country.summary, url: `${SITE_URL}${country.path}` },
  });
}

for (const post of seoBlogPosts) {
  pages.push({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.description,
    h1: post.h1,
    body: post.sections.flatMap(([heading, text]) => [`${heading}: ${text}`]),
    schema: { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.h1, description: post.description, author: { "@type": "Organization", name: "Go To Central Asia" }, publisher: { "@type": "Organization", name: "Go To Central Asia", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } }, mainEntityOfPage: `${SITE_URL}/blog/${post.slug}` },
  });
}

await Promise.all(pages.map((page) => writeRoute(page.path, inject(page))));
console.log(`✅ Prerendered SEO HTML for ${pages.length} routes`);
