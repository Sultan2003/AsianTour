import React, { useState, useRef } from "react";
import styles from "./timeline.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import pyramid from "../../assets/timeline/pyramid.jpg";
import olympic from "../../assets/timeline/olympic.jpg";

const HistoricalTimeline = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollRef = useRef(null);

  // === 👇 Mouse drag-to-scroll setup ===
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // === Your events data ===
  const events = [
    {
      year: -2560,
      title: "Construction of the Great Pyramid of Giza",
      image: pyramid,
      description:
        "Built in Egypt, one of the Seven Wonders of the Ancient World, symbolizing ancient architectural mastery.",
    },
    {
      year: -2500,
      title: "Flourishing of the Indus Valley Civilization",
      description:
        "Cities like Harappa and Mohenjo-Daro thrive with advanced urban planning, drainage, and trade networks.",
    },
    {
      year: -2000,
      title: "Rise of the Sogdian Civilization in Central Asia",
      description:
        "Sogdiana (modern Uzbekistan and Tajikistan) becomes a vital Silk Road trade hub with centers in Samarkand and Bukhara.",
    },
    {
      year: -1792,
      title: "Reign of Hammurabi in Babylon",
      description:
        "King Hammurabi creates one of the world’s first written law codes in Mesopotamia — the Code of Hammurabi.",
    },
    {
      year: -776,
      title: "First Ancient Olympic Games",
      image: olympic,
      description:
        "Held in Olympia, Greece — celebrating physical excellence and unity among city-states.",
    },
    {
      year: -1500,
      title: "Formation of the Hittite Empire",
      description:
        "The Hittites dominate Anatolia (modern Turkey) — early masters of iron weapons and chariot warfare.",
    },
    {
      year: -1200,
      title: "Troy and the Trojan War",
      description:
        "The fabled conflict between Mycenaean Greece and Troy occurs — immortalized in Homer's Iliad.",
    },
    {
      year: -1046,
      title: "Founding of the Zhou Dynasty in China",
      description:
        "The Zhou Dynasty begins, introducing the ‘Mandate of Heaven’ concept that defines Chinese rule for centuries.",
    },

    {
      year: -550,
      title: "Formation of the Persian Achaemenid Empire",
      description:
        "Cyrus the Great establishes an empire stretching from the Indus River to the Aegean Sea.",
    },
    {
      year: -330,
      title: "Alexander the Great Conquers Sogdiana",
      description:
        "Alexander the Great captures Samarkand (Maracanda), integrating Central Asia into the Hellenistic world.",
    },
    {
      year: -221,
      title: "Unification of China under Qin Dynasty",
      image: "/images/china.jpg",
      description:
        "Qin Shi Huang unifies China, standardizing laws and initiating the Great Wall.",
    },
    {
      year: -44,
      title: "Assassination of Julius Caesar",
      image: "/images/caesar.jpg",
      description:
        "A turning point in Roman history, marking the transition from Republic to Empire.",
    },
    {
      year: 0,
      title: "Birth of Jesus Christ",
      description:
        "Symbolic beginning of the Anno Domini era — a new epoch in Western chronology.",
      isSpecial: true,
    },
    {
      year: 224,
      title: "Rise of the Sassanid Empire in Persia",
      description:
        "A powerful empire influencing Central Asia and fostering Zoroastrian culture.",
    },
    {
      year: 476,
      title: "Fall of the Western Roman Empire",
      image: "/images/rome.jpg",
      description:
        "Marks the end of ancient Rome and the beginning of the European Middle Ages.",
    },
    {
      year: 552,
      title: "Formation of the First Turkic Khaganate",
      description:
        "Turkic tribes unite under Bumin Qaghan, marking the dawn of Turkic civilization.",
    },
    {
      year: 622,
      title: "Hijra: Founding of Islam",
      image: "/images/islam.jpg",
      description:
        "Prophet Muhammad migrates to Medina — the Islamic calendar begins.",
    },
    {
      year: 751,
      title: "Battle of Talas",
      description:
        "Arabs defeat Chinese forces in Central Asia — paper-making technology spreads westward.",
    },
    {
      year: 819,
      title: "Rise of the Samanid Dynasty in Bukhara",
      description:
        "Bukhara becomes a flourishing center of science, literature, and Persian-Islamic culture.",
    },
    {
      year: 999,
      title: "Karakhanid Dynasty conquers Transoxiana",
      description:
        "First Turkic Muslim dynasty rules over present-day Uzbekistan, spreading Islamic culture.",
    },
    {
      year: 1206,
      title: "Rise of the Mongol Empire",
      image: "/images/mongol.jpg",
      description:
        "Genghis Khan unites Mongol tribes, building the largest contiguous empire in history.",
    },
    {
      year: 1220,
      title: "Destruction of Bukhara and Samarkand by Mongols",
      description:
        "Central Asia’s great cities are devastated but later revived as key Silk Road centers.",
    },
    {
      year: 1336,
      title: "Birth of Amir Timur (Tamerlane)",
      description:
        "Born in Shahrisabz — founder of the Timurid Empire and a legendary conqueror and patron of art.",
    },
    {
      year: 1369,
      title: "Samarkand Becomes Capital of the Timurid Empire",
      description:
        "Timur transforms Samarkand into one of the world’s most splendid architectural capitals.",
    },
    {
      year: 1399,
      title: "Timur’s Western Campaigns",
      description:
        "Timur expands his empire across Persia, India, and Anatolia, defeating the Ottoman Sultan Bayezid I.",
    },

    {
      year: 1469,
      title: "Rule of Ulugh Beg in Samarkand",
      description:
        "Ulugh Beg builds an observatory and advances astronomy — his star catalog surpasses Europe’s accuracy for centuries.",
    },
    {
      year: 1500,
      title: "Shaybani Khan Captures Samarkand",
      description:
        "Uzbek Shaybanids establish a new dynasty in Central Asia, ending the Timurid era.",
    },
    {
      year: 1599,
      title: "Start of the Ashtarkhanid Dynasty (Bukhara Khanate)",
      description:
        "Bukhara remains a center of Islamic learning, art, and regional diplomacy.",
    },
    {
      year: 1740,
      title: "Nadir Shah Invades Central Asia",
      description:
        "Persian ruler Nadir Shah captures Khiva and Bukhara, reshaping the region’s power balance.",
    },
    {
      year: 1868,
      title: "Russian Conquest of Samarkand",
      description:
        "Russian Empire seizes Samarkand and Bukhara, integrating Uzbekistan into its sphere of influence.",
    },
    // 🚩 After 1840: Only two events, spaced 100 years apart
    {
      year: 1924,
      title: "Formation of the Uzbek Soviet Socialist Republic",
      description:
        "Uzbekistan becomes part of the USSR — major industrial and cultural transformation begins.",
    },
    {
      year: 1991,
      title: "Independence of the Republic of Uzbekistan",
      description:
        "Uzbekistan declares sovereignty following the dissolution of the Soviet Union on August 31.",
    },
  ];

  const minYear = Math.min(...events.map((e) => e.year)) - 100;
  const maxYear = Math.max(...events.map((e) => e.year)) + 100;
  const step = 50;

  const years = [];
  for (let y = minYear; y <= maxYear; y += step) years.push(y);

  const gap = 120;
  const totalWidth = (years.length - 1) * gap;
  const getLeft = (year) =>
    ((year - minYear) / (maxYear - minYear)) * totalWidth;

  const handleClick = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <motion.div
      className={styles.timelineContainer}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setActiveIndex(null);
      }}
      animate={{ height: expanded ? 400 : 200 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={styles.timelineInner}>
        <div
          className={styles.timelineWrapper}
          style={{ width: `${totalWidth + 200}px` }}
        >
          <div
            className={styles.timelineLine}
            style={{ width: `${totalWidth + 200}px` }}
          ></div>

          {years.map((year, i) => (
            <div
              key={i}
              className={styles.yearMark}
              style={{ left: `${getLeft(year)}px` }}
            >
              <span className={styles.yearLabel}>
                {year < 0 ? `${Math.abs(year)} BC` : `${year} AD`}
              </span>
            </div>
          ))}

          {events.map((event, i) => {
            const isAbove = i % 2 === 0;

            if (event.isSpecial) {
              return (
                <motion.div
                  key={i}
                  className={`${styles.specialEventNode} ${
                    activeIndex === i ? styles.active : ""
                  }`}
                  style={{ left: `${getLeft(event.year)}px` }}
                  onClick={() => handleClick(i)}
                  whileHover={{ scale: 1.15 }}
                >
                  <div className={styles.specialMarker}>
                    <span>0 AD</span>
                  </div>

                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        className={`${styles.eventTooltip} ${styles.tooltipAbove}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.tooltipContent}>
                          <h4 className={styles.tooltipTitle}>{event.title}</h4>
                          <p className={styles.tooltipYear}>0 AD</p>
                          <p className={styles.tooltipText}>
                            {event.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={i}
                className={`${styles.eventNode} ${
                  isAbove ? styles.above : styles.below
                } ${activeIndex === i ? styles.active : ""}`}
                style={{ left: `${getLeft(event.year)}px` }}
                onClick={() => handleClick(i)}
                whileHover={{ scale: 1.08 }}
              >
                {expanded && (
                  <>
                    <button
                      className={styles.eventButton}
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className={styles.overlay}></div>
                      <span className={styles.buttonText}>{event.title}</span>
                    </button>

                    <AnimatePresence>
                      {activeIndex === i && (
                        <motion.div
                          className={`${styles.eventTooltip} ${
                            isAbove ? styles.tooltipAbove : styles.tooltipBelow
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={styles.tooltipContent}>
                            <h4 className={styles.tooltipTitle}>
                              {event.title}
                            </h4>
                            <p className={styles.tooltipYear}>
                              {event.year < 0
                                ? `${Math.abs(event.year)} BC`
                                : `${event.year} AD`}
                            </p>
                            <p className={styles.tooltipText}>
                              {event.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default HistoricalTimeline;
