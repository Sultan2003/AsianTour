import { readFile, writeFile, mkdir } from "fs/promises";
import { seoBlogPosts, seoCountryPages, seoTourPages } from "../src/seo/staticSeoPages.js";
import { getAlternateUrls, getCanonicalUrl, splitLocalePathname, withRussianPrefix } from "../src/seo/canonical.js";

const SITE_URL = "https://www.gotocentralasia.com";
const template = await readFile("dist/index.html", "utf8");

const escapeHtml = (value = "") => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (html = "") => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const homepageDestinations = [
  { name: "Uzbekistan", path: "/uzbekistan", description: "Samarkand, Bukhara, Khiva and Tashkent tours with Silk Road monuments, bazaars and warm hospitality." },
  { name: "Kyrgyzstan", path: "/kyrgyzstan", description: "Mountain itineraries with alpine lakes, yurt camps, nomad culture, horse riding and scenic valleys." },
  { name: "Kazakhstan", path: "/kazakhstan", description: "Almaty, Astana, canyon landscapes, steppe routes and modern city experiences." },
  { name: "Tajikistan", path: "/tajikistan", description: "Pamir Highway, Fann Mountains, Dushanbe and adventurous cultural programs with local support." },
  { name: "Turkmenistan", path: "/turkmenistan", description: "Ashgabat, Merv, desert routes and Darvaza gas crater travel with carefully planned logistics." },
  { name: "Caucasus", path: "/caucasus", description: "Georgia, Armenia and Azerbaijan extensions with heritage cities, mountain scenery and regional cuisine." },
];

const tourCategories = [
  { name: "Cultural Tours", path: "/cultural-tours", description: "Guided heritage routes through Silk Road cities, museums, monuments and local craft traditions." },
  { name: "Gastronomy Tours", path: "/gastronomy-tours", description: "Food-focused itineraries with bazaars, cooking experiences, tea houses and regional specialties." },
  { name: "Religious Tours", path: "/religious-tours", description: "Pilgrimage and sacred heritage tours covering important Islamic and regional spiritual sites." },
  { name: "Eco Tours", path: "/eco-tours", description: "Nature-forward journeys through mountains, valleys, deserts and rural landscapes." },
  { name: "City Tours", path: "/city-tours", description: "Short guided city programs in Tashkent, Samarkand, Bukhara, Khiva and other regional capitals." },
  { name: "Business and MICE Tours", path: "/business-mice-tours", description: "Professional travel support for meetings, incentives, conferences and business delegations." },
];

const cityDestinations = [
  { name: "Tashkent", path: "/uzbekistan-tashkent" },
  { name: "Samarkand", path: "/uzbekistan-samarkand" },
  { name: "Bukhara", path: "/uzbekistan-bukhara" },
  { name: "Khiva", path: "/uzbekistan-khiva" },
  { name: "Almaty", path: "/kazakhstan-almaty" },
  { name: "Bishkek", path: "/kyrgyzstan-bishkek" },
];

const renderParagraphs = (body = []) => body.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
const renderLinkList = (items = []) => `<ul>${items.map((item) => `<li><a href="${escapeHtml(item.path)}">${escapeHtml(item.name)}</a>${item.description ? ` - ${escapeHtml(item.description)}` : ""}</li>`).join("")}</ul>`;

function buildHomepageContent({ h1, body }) {
  const featuredTours = seoTourPages.slice(0, 5);
  return `
    <section id="seo-prerendered-content" aria-label="Homepage travel content">
      <h1>${escapeHtml(h1)}</h1>
      ${renderParagraphs(body)}
      <section aria-labelledby="seo-featured-tours">
        <h2 id="seo-featured-tours">Featured Central Asia tour packages</h2>
        ${featuredTours.map((tour) => `
          <article>
            <h3><a href="/tour/${escapeHtml(tour.slug)}">${escapeHtml(tour.h1)}</a></h3>
            ${renderParagraphs(tour.body.slice(0, 2))}
            <p><strong>From US$ ${escapeHtml(tour.price)}</strong>. Highlights: ${escapeHtml(tour.highlights.join(", "))}.</p>
          </article>
        `).join("")}
      </section>
      <section aria-labelledby="seo-destinations">
        <h2 id="seo-destinations">Popular destinations</h2>
        ${renderLinkList(homepageDestinations)}
      </section>
      <section aria-labelledby="seo-city-guides">
        <h2 id="seo-city-guides">City travel guides</h2>
        ${renderLinkList(cityDestinations)}
      </section>
      <section aria-labelledby="seo-tour-styles">
        <h2 id="seo-tour-styles">Tour styles</h2>
        ${renderLinkList(tourCategories)}
      </section>
      <section aria-labelledby="seo-planning">
        <h2 id="seo-planning">How we plan your itinerary</h2>
        <p>Our team can combine private guides, hotels, trains, road transfers, entrance arrangements and regional extensions into one clear itinerary. Travelers can choose fixed group departures, tailor-made private tours or short city programs depending on dates, comfort level and budget.</p>
      </section>
    </section>`;
}

function buildContent(page) {
  if (page.path === "/") return buildHomepageContent(page);
  return `<section id="seo-prerendered-content"><h1>${escapeHtml(page.h1)}</h1>${renderParagraphs(page.body)}</section>`;
}

function inject(page, outputPath = page.path) {
  const { title, description, schema } = page;
  const canonical = getCanonicalUrl(outputPath);
  const alternates = getAlternateUrls(outputPath);
  const { isRussian } = splitLocalePathname(outputPath);
  const content = buildContent(page);
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${isRussian ? "ru" : "en"}"`);
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  html = html.replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${isRussian ? "ru_RU" : "en_US"}" />`);
  html = html.replace(
    "</head>",
    `<link rel="alternate" hreflang="en" href="${alternates.en}" />
<link rel="alternate" hreflang="ru" href="${alternates.ru}" />
<link rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />
<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`,
  );
  return html;
}

async function writeRoute(path, html) {
  const dir = path === "/" ? "dist" : `dist${path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
}

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "TravelAgency", name: "Go To Central Asia", url: SITE_URL, image: `${SITE_URL}/logo.png`, address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" } },
    { "@type": "ItemList", name: "Featured Central Asia tours", itemListElement: seoTourPages.slice(0, 5).map((tour, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}/tour/${tour.slug}`, name: tour.h1, description: tour.description })) },
    { "@type": "ItemList", name: "Popular Central Asia destinations", itemListElement: homepageDestinations.map((destination, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}${destination.path}`, name: destination.name, description: destination.description })) },
  ],
};

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
  schema: homepageSchema,
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

await Promise.all(
  pages.flatMap((page) => [
    writeRoute(page.path, inject(page)),
    writeRoute(withRussianPrefix(page.path), inject(page, withRussianPrefix(page.path))),
  ]),
);
console.log(`✅ Prerendered SEO HTML for ${pages.length * 2} routes`);
