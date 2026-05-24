import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./AttractionDetails.module.scss";

const STRAPI_URL =
  import.meta.env.VITE_STRAPI_URL ||
  "https://brilliant-passion-7d3870e44b.strapiapp.com";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const resolveMediaUrl = (media) => {
  if (!media) return null;

  const url =
    media?.url ||
    media?.formats?.large?.url ||
    media?.formats?.medium?.url ||
    media?.formats?.small?.url;

  if (!url) return null;

  if (url.startsWith("http")) return url;

  return `${STRAPI_URL}${url}`;
};

const normalizeMedia = (media) => {
  if (!media) return null;

  const item = media?.data || media;

  if (Array.isArray(item)) {
    return item.map((img) => ({
      id: img?.id,
      url: resolveMediaUrl(img?.attributes || img),
      alternativeText:
        img?.attributes?.alternativeText || img?.alternativeText || "",
      caption: img?.attributes?.caption || img?.caption || "",
    }));
  }

  const source = item?.attributes || item;

  return {
    id: item?.id,
    url: resolveMediaUrl(source),
    alternativeText: source?.alternativeText || "",
    caption: source?.caption || "",
  };
};

const normalizeRichText = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;

        if (item?.children) {
          return item.children.map((child) => child?.text || "").join("");
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeCategories = (categories) => {
  if (!categories) return [];

  if (Array.isArray(categories)) {
    return categories.filter(Boolean);
  }

  if (typeof categories === "string") {
    try {
      const parsed = JSON.parse(categories);

      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean);
      }
    } catch (e) {}

    return categories
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const transformStrapiAttraction = (response) => {
  const raw = response?.data?.[0] || response?.data || response;

  const data = raw?.attributes || raw;

  if (!data) return null;

  const gallery = normalizeMedia(data?.gallery) || [];
  const heroImage = normalizeMedia(data?.heroImage);

  const nearbyRaw =
    data?.nearbyAttractions?.data || data?.nearbyAttractions || [];

  const nearbyAttractions = nearbyRaw.map((item) => {
    const nearby = item?.attributes || item;

    return {
      id: item?.id,
      title: nearby?.title,
      slug: nearby?.slug,
      country: nearby?.country,
      city: nearby?.city,
      shortDescription: nearby?.shortDescription,
      heroImage: normalizeMedia(nearby?.heroImage),
    };
  });

  return {
    id: raw?.id,
    title: data?.title,
    slug: data?.slug,
    subtitle: data?.subtitle,
    country: data?.country,
    city: data?.city,
    shortDescription: data?.shortDescription,
    description: normalizeRichText(data?.description),
    heroImage,
    gallery,
    categories: normalizeCategories(data?.categories),
    bestTime: data?.bestTime,
    duration: data?.duration,
    entranceFee: data?.entranceFee,
    openingHours: data?.openingHours,
    coordinates: data?.coordinates,
    faq: data?.faq || [],
    stats: data?.stats || [],
    nearbyAttractions,
    metaTitle: data?.metaTitle,
    metaDescription: data?.metaDescription,
    ctaTitle: data?.ctaTitle,
    ctaSubtitle: data?.ctaSubtitle,
  };
};

const Badge = ({ children }) => (
  <span className={styles.badge}>
    <span className={styles.badgeGlow} />
    {children}
  </span>
);

const SectionHeading = ({ eyebrow, title, description }) => (
  <motion.div
    className={styles.sectionHeading}
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

    <h2>{title}</h2>

    {description && <p>{description}</p>}
  </motion.div>
);

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      className={`${styles.faqItem} ${open ? styles.activeFaq : ""}`}
      variants={cardReveal}
    >
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{item?.question}</span>

        <div className={styles.faqIcon}>
          <span />
          <span className={open ? styles.minus : ""} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <div>
              <p>{item?.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AttractionDetails = ({
  attraction: initialAttraction,
  isLoading = false,
}) => {
  const { slug } = useParams();

  const heroRef = useRef(null);

  const [activeImage, setActiveImage] = useState(null);

  const attraction = useMemo(() => {
    if (!initialAttraction) return null;

    return transformStrapiAttraction(initialAttraction);
  }, [initialAttraction]);

  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 900], [0, 220]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.45, 0.8]);

  useEffect(() => {
    if (!attraction) return;

    document.title =
      attraction.metaTitle || `${attraction.title} | Go To Central Asia`;

    let meta = document.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    meta.setAttribute(
      "content",
      attraction.metaDescription || attraction.shortDescription || "",
    );
  }, [attraction]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loader} />
        </div>
      </div>
    );
  }

  if (!attraction) return null;

  const {
    title,
    subtitle,
    country,
    city,
    shortDescription,
    description,
    heroImage,
    gallery,
    categories,
    bestTime,
    duration,
    entranceFee,
    openingHours,
    coordinates,
    faq,
    stats,
    nearbyAttractions,
    ctaTitle,
    ctaSubtitle,
  } = attraction;

  const location = [city, country].filter(Boolean).join(", ");

  const hero =
    heroImage?.url || gallery?.[0]?.url || "/fallback-attraction.jpg";

  return (
    <div className={styles.page}>
      <section className={styles.hero} ref={heroRef}>
        <motion.div
          className={styles.heroBg}
          style={{
            backgroundImage: `url(${hero})`,
            y: heroY,
          }}
        />

        <motion.div
          className={styles.heroOverlay}
          style={{
            opacity: overlayOpacity,
          }}
        />

        <div className={styles.heroNoise} />

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroTop}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className={styles.badges} variants={fadeUp}>
              {categories?.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
            </motion.div>

            {location && (
              <motion.div className={styles.heroLocation} variants={fadeUp}>
                <span className={styles.locationDot} />
                {location}
              </motion.div>
            )}

            <motion.h1 className={styles.heroTitle} variants={fadeUp}>
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p className={styles.heroSubtitle} variants={fadeUp}>
                {subtitle}
              </motion.p>
            )}

            {shortDescription && (
              <motion.p className={styles.heroDescription} variants={fadeUp}>
                {shortDescription}
              </motion.p>
            )}
          </motion.div>
        </div>

        <div className={styles.heroBottomFade} />
      </section>

      <section className={styles.infoStrip}>
        <div className={styles.infoGrid}>
          {bestTime && (
            <div className={styles.infoCard}>
              <span>Best time</span>
              <strong>{bestTime}</strong>
            </div>
          )}

          {duration && (
            <div className={styles.infoCard}>
              <span>Duration</span>
              <strong>{duration}</strong>
            </div>
          )}

          {entranceFee && (
            <div className={styles.infoCard}>
              <span>Entrance fee</span>
              <strong>{entranceFee}</strong>
            </div>
          )}

          {openingHours && (
            <div className={styles.infoCard}>
              <span>Opening hours</span>
              <strong>{openingHours}</strong>
            </div>
          )}
        </div>
      </section>

      {stats?.length > 0 && (
        <section className={styles.statsSection}>
          <motion.div
            className={styles.statsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                className={styles.statCard}
                key={`${stat?.label}-${index}`}
                variants={cardReveal}
              >
                <h3>{stat?.value}</h3>
                <p>{stat?.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {gallery?.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Gallery"
              title="Discover the atmosphere"
              description="Experience the textures, architecture, landscapes, and timeless spirit of this destination."
            />

            <motion.div
              className={styles.galleryGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {gallery.map((image, index) => (
                <motion.button
                  key={image?.id || index}
                  className={`${styles.galleryItem} ${
                    index % 5 === 0 ? styles.large : ""
                  }`}
                  variants={cardReveal}
                  onClick={() => setActiveImage(image?.url)}
                >
                  <img
                    src={image?.url}
                    alt={image?.alternativeText || image?.caption || title}
                  />

                  <div className={styles.galleryOverlay}>
                    <span>View image</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {description?.length > 0 && (
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <SectionHeading
                eyebrow="About destination"
                title={`Explore ${title}`}
                description={location}
              />

              <motion.div
                className={styles.aboutContent}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {description.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={fadeUp}
                    dangerouslySetInnerHTML={{
                      __html: paragraph,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {coordinates?.lat && coordinates?.lng && (
        <section className={styles.mapSection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Location"
              title="Find it on the map"
              description="Plan your journey and explore nearby highlights around this attraction."
            />

            <motion.div
              className={styles.mapWrapper}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <iframe
                title={title}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=14&output=embed`}
              />

             

              <div className={styles.mapInfoCard}>
                <span>Destination</span>

                <h3>{title}</h3>

                <p>{[city, country].filter(Boolean).join(", ")}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {nearbyAttractions?.length > 0 && (
        <section className={styles.nearbySection}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Nearby places"
              title="Continue your adventure"
              description="Discover more remarkable destinations close to this attraction."
            />

            <motion.div
              className={styles.nearbyGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {nearbyAttractions.map((item, index) => (
                <motion.div
                  className={styles.nearbyCard}
                  key={item?.id || index}
                  variants={cardReveal}
                >
                  <div className={styles.nearbyImage}>
                    <img
                      src={item?.heroImage?.url || "/fallback-attraction.jpg"}
                      alt={item?.title}
                    />
                  </div>

                  <div className={styles.nearbyContent}>
                    <span>
                      {[item?.city, item?.country].filter(Boolean).join(", ")}
                    </span>

                    <h3>{item?.title}</h3>

                    {item?.shortDescription && <p>{item?.shortDescription}</p>}

                    <Link
                      to={`/attractions/${item?.slug}`}
                      className={styles.nearbyButton}
                    >
                      Explore
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {faq?.length > 0 && (
        <section className={styles.faqSection}>
          <div className={styles.containerSmall}>
            <SectionHeading
              eyebrow="Questions"
              title="Frequently asked questions"
            />

            <motion.div
              className={styles.faqList}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {faq.map((item, index) => (
                <FaqItem
                  key={`${item?.question}-${index}`}
                  item={item}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaCard}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaGlow} />

            <span className={styles.ctaEyebrow}>Go To Central Asia</span>

            <h2>{ctaTitle || "Start your next journey"}</h2>

            <p>
              {ctaSubtitle ||
                "Discover unforgettable routes, hidden gems, and timeless experiences across Central Asia."}
            </p>

            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.primaryBtn}>
                Plan your trip
              </Link>

              <Link to="/attractions" className={styles.secondaryBtn}>
                Explore more
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.img
              src={activeImage}
              alt="Gallery preview"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            />

            <button
              className={styles.closeLightbox}
              onClick={() => setActiveImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AttractionDetails;
