import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import fetch from "node-fetch";

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";

async function generate() {
  const sitemap = new SitemapStream({
    hostname: "https://www.gotocentralasia.com",
  });

  // Base pages
  sitemap.write({ url: "/", priority: 1.0 });
  sitemap.write({ url: "/all-tours", priority: 0.9 });

  try {
    const res = await fetch(
      `${STRAPI}/api/asian-tours?pagination[limit]=500&populate=*`
    );
    const data = await res.json();

    (data.data || []).forEach((tour) => {
      // Skip empty / invalid items
      if (!tour || !tour.attributes) return;

      const title = tour.attributes.title ?? "";
      if (!title.trim()) return;

      // Create slug same as your React makeSlug()
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      sitemap.write({
        url: `/tour/${slug}`,
        changefreq: "monthly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });
  } catch (error) {
    console.error("❌ Failed to fetch Strapi tours:", error);
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  createWriteStream("./public/sitemap.xml").write(xml);

  console.log("✅ Sitemap generated successfully!");
}

generate();
