import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import fetch from "node-fetch";

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";

async function generate() {
  const sitemap = new SitemapStream({
    hostname: "https://www.gotocentralasia.com",
  });

  // Base URLs
  sitemap.write({ url: "/", priority: 1.0 });
  sitemap.write({ url: "/all-tours", priority: 0.9 });

  // Fetch tours from Strapi
  const res = await fetch(
    `${STRAPI}/api/asian-tours?pagination[limit]=500&populate=*`
  );
  const data = await res.json();

  (data.data || []).forEach((tour) => {
    const title = tour.attributes.title || "";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    sitemap.write({
      url: `/tour/${slug}`,
      changefreq: "monthly",
      priority: 0.8,
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  createWriteStream("./public/sitemap.xml").write(xml);

  console.log("✅ Sitemap generated!");
}

generate();
