import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSeoData } from "../../seo/routeSeoConfig";

const SeoHelmet = () => {
  const { pathname } = useLocation();
  const seo = getSeoData(pathname);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={seo.htmlLang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={seo.robots} />
      <link rel="canonical" href={seo.canonical} />
      <link rel="alternate" hrefLang="en" href={seo.alternates.en} />
      <link rel="alternate" hrefLang="ru" href={seo.alternates.ru} />
      <link rel="alternate" hrefLang="x-default" href={seo.alternates.xDefault} />

      <meta property="og:locale" content={seo.locale} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seo.twitterSite} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {seo.schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHelmet;
