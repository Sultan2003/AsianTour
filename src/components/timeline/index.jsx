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
    // Only respond to left-click
    if (e.button !== 0) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || e.buttons !== 1) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // === Events data ===
  const events = [
    {
      year: -900,
      title: "Rise of the Neo-Assyrian Empire",
      description:
        "Assyria begins expanding from northern Mesopotamia, forming the first true imperial power in history.",
    },
    {
      year: -814,
      title: "Founding of Carthage",
      description:
        "Phoenician settlers establish Carthage in North Africa, which becomes a major maritime and trading empire.",
    },
    {
      year: -776,
      title: "First Ancient Olympic Games",
      image: olympic,
      description:
        "Held in Olympia, Greece — celebrating unity and athletic excellence.",
    },
    {
      year: -612,
      title: "Fall of Nineveh",
      description:
        "The Neo-Assyrian capital is destroyed by Babylonians and Medes, ending Assyrian dominance.",
    },
    {
      year: -550,
      title: "Formation of the Achaemenid Persian Empire",
      description:
        "Cyrus the Great unites Medes and Persians into one of history’s largest empires.",
    },
    {
      year: -539,
      title: "Cyrus Captures Babylon",
      description:
        "Cyrus the Great conquers Babylon and issues the Cyrus Cylinder — considered the first human rights declaration.",
    },
    {
      year: -490,
      title: "Battle of Marathon",
      description:
        "Greek forces defeat the Persian invasion, symbolizing democracy’s resilience.",
    },
    {
      year: -327,
      title: "Alexander the Great Invades Central Asia",
      description:
        "Alexander conquers Bactria and Sogdiana — present-day Uzbekistan and Afghanistan.",
    },
    {
      year: -256,
      title: "Formation of the Greco-Bactrian Kingdom",
      description:
        "Greek settlers establish a Hellenistic state blending Greek and Asian cultures.",
    },
    {
      year: -221,
      title: "Unification of China under the Qin Dynasty",
      description:
        "Qin Shi Huang centralizes power and begins construction of the Great Wall.",
    },
    {
      year: -141,
      title: "Han Dynasty Expands into Central Asia",
      description:
        "Emperor Wu sends Zhang Qian westward — the Silk Road is born.",
    },
    {
      year: -44,
      title: "Assassination of Julius Caesar",
      description: "The fall of the Roman Republic and the rise of the Empire.",
    },
    {
      year: 0,
      title: "Traditional Birth of Jesus Christ",
      description: "Marks the beginning of the Anno Domini era.",
      isSpecial: true,
    },
    {
      year: 224,
      title: "Rise of the Sassanid Empire",
      description:
        "Ardashir I overthrows the Parthians and founds the Sassanid dynasty.",
    },
    {
      year: 552,
      title: "First Turkic Khaganate Established",
      description:
        "Turkic tribes unite under Bumin Qaghan — start of Turkic statehood.",
    },
    {
      year: 622,
      title: "Hijra — Founding of Islam",
      description:
        "Prophet Muhammad migrates to Medina — year 1 of the Islamic calendar.",
    },
    {
      year: 751,
      title: "Battle of Talas",
      description:
        "Arabs defeat Tang China; papermaking spreads westward through Central Asia.",
    },
    {
      year: 819,
      title: "Rise of the Samanid Dynasty in Bukhara",
      description:
        "Bukhara becomes a cultural capital of the Islamic Golden Age.",
    },
    {
      year: 999,
      title: "Karakhanid Dynasty Conquers Transoxiana",
      description: "First Turkic Muslim state forms in Central Asia.",
    },
    {
      year: 1220,
      title: "Destruction of Samarkand by the Mongols",
      description:
        "Genghis Khan’s invasion devastates but later revitalizes Central Asia.",
    },
    {
      year: 1336,
      title: "Birth of Amir Timur (Tamerlane)",
      description: "Founder of the Timurid Empire, born in Shahrisabz.",
    },
    {
      year: 1369,
      title: "Samarkand Becomes Timurid Capital",
      description:
        "Timur transforms Samarkand into a jewel of architecture and culture.",
    },
    {
      year: 1469,
      title: "Ulugh Beg’s Astronomical Legacy",
      description:
        "His observatory in Samarkand produces world-leading star catalogs.",
    },
    {
      year: 1500,
      title: "Shaybani Khan Captures Samarkand",
      description: "The Uzbek Shaybanids establish control over Central Asia.",
    },
    {
      year: 1740,
      title: "Nadir Shah Invades Central Asia",
      description:
        "Persian ruler captures Khiva and Bukhara, extending Persian power.",
    },
    {
      year: 1776,
      title: "American Declaration of Independence",
      description:
        "The U.S. is founded, reshaping global political philosophy.",
    },
    {
      year: 1868,
      title: "Russian Conquest of Samarkand",
      description:
        "Russian Empire annexes Samarkand and Bukhara, ending local independence.",
    },
    {
      year: 1917,
      title: "Russian Revolution",
      description: "Collapse of the Tsarist regime; USSR’s foundations begin.",
    },
    {
      year: 1924,
      title: "Formation of the Uzbek SSR",
      description:
        "Uzbekistan becomes a Soviet Republic, entering modernization.",
    },
    {
      year: 1966,
      title: "Tashkent Earthquake",
      description:
        "A devastating quake reshapes Tashkent’s architecture and society.",
    },
    {
      year: 1991,
      title: "Independence of Uzbekistan",
      description:
        "Uzbekistan declares sovereignty on August 31 after the USSR’s collapse.",
    },
    {
      year: 2016,
      title: "Shavkat Mirziyoyev Becomes President",
      description:
        "A new era of reform and modernization begins in Uzbekistan.",
    },
    {
      year: 2025,
      title: "Uzbekistan Expands Regional Connectivity",
      description:
        "Rail and infrastructure projects link Uzbekistan with China and Europe.",
    },
  ];

  // === Year spacing logic ===
  const minYear = Math.min(...events.map((e) => e.year)) - 40;
  const maxYear = Math.max(...events.map((e) => e.year)) + 20;

  const stepBefore1800 = 40;
  const stepAfter1800 = 10;

  const years = [];
  for (let y = minYear; y < 1800; y += stepBefore1800) years.push(y);
  for (let y = 1800; y <= maxYear; y += stepAfter1800) years.push(y);

  const gapBefore1800 = 120;
  const gapAfter1800 = 120;

  const before1800Count = Math.floor((1800 - minYear) / stepBefore1800);
  const after1800Count = Math.floor((maxYear - 1800) / stepAfter1800);
  const totalWidth =
    before1800Count * gapBefore1800 + after1800Count * gapAfter1800;

  const getLeft = (year) => {
    if (year < 1800) {
      return ((year - minYear) / stepBefore1800) * gapBefore1800;
    } else {
      const beforeWidth = before1800Count * gapBefore1800;
      return beforeWidth + ((year - 1800) / stepAfter1800) * gapAfter1800;
    }
  };

  const handleClick = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <motion.div
      className={styles.timelineContainer}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ cursor: "grab" }}
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
          {/* === Base Timeline Line === */}
          <div
            className={styles.timelineLine}
            style={{ width: `${totalWidth + 200}px` }}
          ></div>

          {/* === Year Marks === */}
          {years.map((year, i) => (
            <motion.div
              key={i}
              className={styles.yearMark}
              style={{ left: `${getLeft(year)}px` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
            >
              <span className={styles.yearLabel}>
                {year < 0 ? `${Math.abs(year)} BC` : `${year} AD`}
              </span>
            </motion.div>
          ))}

          {/* === Events === */}
          {events.map((event, i) => {
            const isAbove = i % 2 === 0;
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
