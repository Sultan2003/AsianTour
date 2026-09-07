import React from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { createServer } from "vite";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";
import { seoBlogPosts, seoCountryPages, seoTourPages } from "../src/seo/staticSeoPages.js";
import { staticPrerenderPages } from "../src/seo/staticRouteSeo.js";
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

function buildUzbekistanTourContent() {
  const tours = seoTourPages.filter((tour) => /uzbekistan|tashkent|samarkand|bukhara/i.test(`${tour.h1} ${tour.description}`));
  return `<section id="seo-prerendered-content" aria-label="Uzbekistan tour packages"><h1>Uzbekistan Tours</h1><p>Browse current Uzbekistan private and group tour packages with Silk Road highlights.</p>${tours.map((tour) => { const isPrivate = tour.slug === "8-day-private-classic-uzbekistan-tour"; const path = isPrivate ? `/private-tour/${tour.slug}` : `/tour/${tour.slug}`; return `<article><h2><a href="${path}">${escapeHtml(tour.h1)}</a></h2><p>${escapeHtml(tour.description)}</p><p>From US$ ${escapeHtml(tour.price)}</p></article>`; }).join("")}</section>`;
}

function buildStaticFallbackContent(page) {
  if (page.path === "/") return buildHomepageContent(page);
  if (page.path === "/about") {
    return `<main id="seo-prerendered-content">
      <section aria-labelledby="about-heading">
        <h1 id="about-heading">${escapeHtml(page.h1)}</h1>
        ${renderParagraphs(page.body)}
      </section>
      <section aria-labelledby="team-heading">
        <h2 id="team-heading">Our Team</h2>
        <article>
          <header>
            <a href="//needguide.net/view_guide.php?user_id=23134">Гид-экскурсовод в Ташкенте Шерзод Алиев</a>
            <h3>Sherzod Aliyev</h3>
            <p>Co-Founder and Director of Miramax Travel Management</p>
          </header>
          <p>Finance graduate, Sherzod has years of experience in corporate business and has led Miramax Travel Management as Director since 2017.</p>
        </article>
        <article>
          <h3>Sultanbek Erkinbaev</h3>
          <p>Lead Software Specialist</p>
          <p>Software engineering graduate, Sultanbek has professional experience in HR and software development. At Miramax Travel Management he contributes to modern web systems and platform development while pursuing a Master’s degree in Data Science and Economics.</p>
        </article>
      </section>
    </main>`;
  }
  return `<section id="seo-prerendered-content"><h1>${escapeHtml(page.h1)}</h1>${renderParagraphs(page.body)}</section>`;
}

function installBrowserMocks(pathname) {
  const storage = new Map([["lang", pathname === "/rus" || pathname.startsWith("/rus/") ? "ru" : "en"]]);
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
    clear: () => storage.clear(),
  };
  globalThis.window = {
    localStorage: globalThis.localStorage,
    location: { pathname, search: "", hash: "" },
    addEventListener() {},
    removeEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    scrollTo() {},
  };
  globalThis.document = {
    documentElement: { lang: pathname === "/rus" || pathname.startsWith("/rus/") ? "ru" : "en" },
    body: {},
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener() {},
    removeEventListener() {},
  };
}

function removeHeadTagsFromAppHtml(html) {
  return html
    .replace(/<title[^>]*>.*?<\/title>/gis, "")
    .replace(/<meta\s[^>]*>/gis, "")
    .replace(/<link\s[^>]*>/gis, "");
}

async function createReactRenderer() {
  installBrowserMocks("/");
  const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  const { LanguageProvider } = await vite.ssrLoadModule("/src/context/LanguageContext.jsx");
  const { default: Router } = await vite.ssrLoadModule("/src/router/index.jsx");

  return {
    async close() {
      await vite.close();
    },
    render(pathname) {
      installBrowserMocks(pathname);
      const helmetContext = {};
      const appHtml = renderToString(
        React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(
            StaticRouter,
            { location: pathname },
            React.createElement(LanguageProvider, null, React.createElement(Router)),
          ),
        ),
      );
      return removeHeadTagsFromAppHtml(appHtml);
    },
  };
}

function seoHead({ title, description, canonical, alternates, isRussian, schema }) {
  const image = `${SITE_URL}/logo.png`;
  const locale = isRussian ? "ru_RU" : "en_US";
  return `<title data-rh="true">${escapeHtml(title)}</title>
<meta data-rh="true" name="description" content="${escapeHtml(description)}" />
<meta data-rh="true" name="robots" content="index,follow,max-image-preview:large" />
<link data-rh="true" rel="canonical" href="${canonical}" />
<link data-rh="true" rel="alternate" hreflang="en" href="${alternates.en}" />
<link data-rh="true" rel="alternate" hreflang="ru" href="${alternates.ru}" />
<link data-rh="true" rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />
<meta data-rh="true" property="og:locale" content="${locale}" />
<meta data-rh="true" property="og:site_name" content="Go To Central Asia" />
<meta data-rh="true" property="og:title" content="${escapeHtml(title)}" />
<meta data-rh="true" property="og:description" content="${escapeHtml(description)}" />
<meta data-rh="true" property="og:type" content="website" />
<meta data-rh="true" property="og:url" content="${canonical}" />
<meta data-rh="true" property="og:image" content="${image}" />
<meta data-rh="true" name="twitter:card" content="summary_large_image" />
<meta data-rh="true" name="twitter:site" content="@gotocentralasia" />
<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}" />
<meta data-rh="true" name="twitter:description" content="${escapeHtml(description)}" />
<meta data-rh="true" name="twitter:image" content="${image}" />
<script data-rh="true" type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function makeBreadcrumbSchema(path, canonical) {
  const parts = path.split("/").filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, ...parts.map((part, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: part.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
      item: index === parts.length - 1 ? canonical : `${SITE_URL}/${parts.slice(0, index + 1).join("/")}`,
    }))],
  };
}

function inject(page, content, outputPath = page.path) {
  const canonical = getCanonicalUrl(outputPath);
  const alternates = getAlternateUrls(outputPath);
  const { isRussian } = splitLocalePathname(outputPath);
  const schema = page.path === "/"
    ? page.schema
    : { "@context": "https://schema.org", "@graph": [page.schema, makeBreadcrumbSchema(outputPath, canonical)] };
  let html = template
    .replace(/<html([^>]*)lang="[^"]*"/, `<html$1lang="${isRussian ? "ru" : "en"}"`)
    .replace("</head>", `${seoHead({ title: page.title, description: page.description, canonical, alternates, isRussian, schema })}</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`);
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
    { "@type": "ItemList", name: "Featured Central Asia tours", itemListElement: seoTourPages.slice(0, 5).map((tour, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}${tour.slug === "8-day-private-classic-uzbekistan-tour" ? "/private-tour/" : "/tour/"}${tour.slug}`, name: tour.h1, description: tour.description })) },
    { "@type": "ItemList", name: "Popular Central Asia destinations", itemListElement: homepageDestinations.map((destination, index) => ({ "@type": "ListItem", position: index + 1, url: `${SITE_URL}${destination.path}`, name: destination.name, description: destination.description })) },
  ],
};

const pages = staticPrerenderPages.map((page) => ({
  ...page,
  schema: page.path === "/" ? homepageSchema : { "@context": "https://schema.org", "@type": "WebPage", name: page.h1, description: page.description, url: `${SITE_URL}${page.path === "/" ? "" : page.path}` },
}));

for (const tour of seoTourPages) {
  // Preserve each tour's public route; the private classic tour must never
  // advertise the legacy /tour/ URL as its canonical.
  const path = tour.slug === "8-day-private-classic-uzbekistan-tour"
    ? `/private-tour/${tour.slug}`
    : `/tour/${tour.slug}`;
  pages.push({
    path,
    title: tour.title,
    description: tour.description,
    h1: tour.h1,
    body: [...tour.body, `Highlights include ${tour.highlights.join(", ")}.`],
    schema: { "@context": "https://schema.org", "@type": "TouristTrip", name: tour.h1, description: strip(tour.body.join(" ")).slice(0, 500), offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD", availability: "https://schema.org/InStock" }, provider: { "@type": "TravelAgency", name: "Go To Central Asia", url: SITE_URL }, url: `${SITE_URL}${path}` },
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

const renderer = await createReactRenderer();
try {
  await Promise.all(
    pages.flatMap((page) => {
      const englishContent = page.path === "/uzbek-tours" ? buildUzbekistanTourContent() : (renderer.render(page.path) || buildStaticFallbackContent(page));
      const russianPath = withRussianPrefix(page.path);
      const russianContent = page.path === "/uzbek-tours" ? buildUzbekistanTourContent() : (renderer.render(russianPath) || buildStaticFallbackContent(page));
      return [
        writeRoute(page.path, inject(page, englishContent)),
        writeRoute(russianPath, inject(page, russianContent, russianPath)),
      ];
    }),
  );
} finally {
  await renderer.close();
}
console.log(`✅ Prerendered real React HTML for ${pages.length * 2} routes`);
