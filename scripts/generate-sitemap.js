import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import fetch from "node-fetch";

const STRAPI = "https://brilliant-passion-7d3870e44b.strapiapp.com";

async function generate() {
  const sitemap = new SitemapStream({
    hostname: "https://www.gotocentralasia.com",
  });

  sitemap.write({ url: "/", priority: 1.0 });
  sitemap.write({ url: "/all-tours", priority: 0.9 });

  const res = await fetch(`${STRAPI}/api/asian-tours?locale=en`);
  const data = await res.json();

  console.log("Strapi raw response:\n", JSON.stringify(data, null, 2));

  const tours = data?.data || [];

  tours.forEach((tour) => {
    // Real tour title — works for your project
    const title =
      tour.title || tour.attributes?.title || tour.attributes?.Name || "";

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    sitemap.write({
      url: `/tour/${slug}`,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  sitemap.end();

  const xml = await streamToPromise(sitemap);
  createWriteStream("./public/sitemap.xml").write(xml);

  console.log("✅ Sitemap generated!");
}

generate();
