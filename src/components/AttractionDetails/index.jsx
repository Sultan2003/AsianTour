import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './AttractionDetails.module.scss';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay } }) };
const cardReveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const Badge = ({ children }) => <span className={styles.badge}><span className={styles.badgeDot} />{children}</span>;
const SectionTitle = ({ children }) => <motion.h2 className={styles.sectionTitle} variants={fadeUp} initial="hidden" whileInView="visible">{children}</motion.h2>;

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return <motion.div className={styles.faqItem} variants={cardReveal} custom={index}><button className={styles.faqQuestion} onClick={() => setOpen(!open)}>{item.question}<span className={styles.faqIcon}>{open ? '−' : '+'}</span></button><AnimatePresence>{open && <motion.div className={styles.faqAnswer} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{item.answer}</p></motion.div>}</AnimatePresence></motion.div>;
};

const AttractionDetails = ({ attraction, isLoading = false }) => {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 600], [0, 160]);

  useEffect(() => {
    if (!attraction) return;
    document.title = attraction.metaTitle || attraction.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.setAttribute('content', attraction.metaDescription || attraction.shortDescription || '');
  }, [attraction]);

  if (isLoading) return <div className={styles.page}>Loading...</div>;
  if (!attraction) return null;

  const { title, country, city, subtitle, description = [], heroImage, gallery = [], categories = [], coordinates, nearbyAttractions = [], faq = [] } = attraction;

  return <div className={styles.page}><section className={styles.hero} ref={heroRef}><motion.div className={styles.heroBg} style={{ backgroundImage: `url(${heroImage?.url || '/fallback-attraction.jpg'})`, y: heroBgY }} /><div className={styles.heroContent}>{categories.map((cat) => <Badge key={cat}>{cat}</Badge>)}<div className={styles.heroLocation}>{city}{country ? `, ${country}` : ''}</div><h1 className={styles.heroTitle}>{title}</h1>{subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}</div></section>{gallery.length > 0 && <section className={styles.gallerySection}><SectionTitle>Discover the beauty</SectionTitle><div className={styles.galleryGrid}>{gallery.map((img) => <img key={img.id} src={img.url} alt={img.caption || title} className={styles.galleryImg} />)}</div></section>}{description.length > 0 && <section className={styles.aboutSection} id="about">{description.map((para, i) => <p key={i} className={styles.aboutPara} dangerouslySetInnerHTML={{ __html: para }} />)}</section>}{coordinates && <section className={styles.mapSection} id="map"><iframe title={title} src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`} loading="lazy" /></section>}{nearbyAttractions.length > 0 && <section className={styles.nearbySection}><SectionTitle>Explore more</SectionTitle><div className={styles.nearbyScrollWrapper}>{nearbyAttractions.map((item) => <a key={item.id} href={`/attractions/${item.slug}`} className={styles.nearbyLink}>{item.title}</a>)}</div></section>}{faq.length > 0 && <section className={styles.faqSection}>{faq.map((item, i) => <FaqItem key={i} item={item} index={i} />)}</section>}</div>;
};

export default AttractionDetails;
