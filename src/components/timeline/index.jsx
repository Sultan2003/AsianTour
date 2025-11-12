import React, { useState, useRef } from "react";
import styles from "./timeline.module.scss";
import { motion, AnimatePresence } from "framer-motion";
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
    // ======== ANCIENT ERA ========
    {
      year: -911,
      title: "Rise of the Neo-Assyrian Empire",
      description:
        "Assyria expands from northern Mesopotamia, establishing one of the first great empires in history.",
    },
    {
      year: -814,
      title: "Founding of Carthage",
      description:
        "Phoenician settlers establish Carthage in North Africa, a key maritime power of the Mediterranean.",
    },
    {
      year: -776,
      title: "First Ancient Olympic Games",
      image: olympic,
      description:
        "Held in Olympia, Greece — celebrating unity and athletic excellence.",
    },
    {
      year: -745,
      title: "Reforms of Tiglath-Pileser III",
      description:
        "Neo-Assyrian king centralizes power, reorganizes provinces, and creates an efficient imperial system.",
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
        "Cyrus the Great unites the Medes and Persians into one of history’s largest empires.",
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
        "Greek city-states defeat the Persian invasion, symbolizing democracy’s resilience.",
    },
    {
      year: -480,
      title: "Battle of Thermopylae and Salamis",
      description:
        "Greek resistance under Leonidas and naval victory at Salamis turn the tide against Persia.",
    },
    {
      year: -331,
      title: "Alexander the Great Conquers Persia",
      description:
        "Alexander defeats Darius III at Gaugamela, ending the Achaemenid Empire and expanding into Central Asia.",
    },
    {
      year: -327,
      title: "Alexander Invades Central Asia",
      description:
        "Alexander conquers Bactria and Sogdiana — regions of modern Uzbekistan and Afghanistan.",
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
      year: -146,
      title: "Rome Destroys Carthage",
      description:
        "The end of the Punic Wars establishes Rome as the dominant Mediterranean power.",
    },
    {
      year: -141,
      title: "Han Dynasty Expands into Central Asia",
      description:
        "Emperor Wu sends Zhang Qian westward — opening the Silk Road.",
    },
    {
      year: -44,
      title: "Assassination of Julius Caesar",
      description: "The fall of the Roman Republic and the rise of the Empire.",
    },
    {
      year: 0,
      title: "Birth of Jesus Christ",
      description:
        "Traditional date marking the beginning of the Anno Domini era.",
      isSpecial: true,
    },
    {
      year: 224,
      title: "Rise of the Sassanid Empire",
      description:
        "Ardashir I overthrows the Parthians and founds the Sassanid dynasty in Persia.",
    },

    // ======== EARLY MEDIEVAL ERA ========
    {
      year: 330,
      title: "Founding of Constantinople",
      description:
        "Constantine establishes a new Roman capital that becomes the Byzantine Empire’s center.",
    },
    {
      year: 476,
      title: "Fall of the Western Roman Empire",
      description:
        "Deposition of Romulus Augustulus marks the traditional end of ancient Rome.",
    },
    {
      year: 552,
      title: "First Turkic Khaganate Established",
      description:
        "Turkic tribes unite under Bumin Qaghan — beginning Turkic statehood.",
    },
    {
      year: 622,
      title: "Hijra — Founding of Islam",
      description:
        "Prophet Muhammad migrates to Medina — year 1 of the Islamic calendar.",
    },
    {
      year: 651,
      title: "Islamic Expansion into Central Asia",
      description:
        "Caliphates reach Transoxiana; local elites begin gradual conversion to Islam.",
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
      description: "The first Turkic Muslim state forms in Central Asia.",
    },

    // ======== HIGH MEDIEVAL ERA ========
    {
      year: 1055,
      title: "Seljuk Turks Enter Baghdad",
      description:
        "Seljuks become protectors of the Abbasid Caliphate, spreading Turkic rule westward.",
    },
    {
      year: 1096,
      title: "First Crusade",
      description:
        "Western European crusaders launch campaigns to seize the Holy Land.",
    },
    {
      year: 1219,
      title: "Genghis Khan Invades Central Asia",
      description:
        "Mongol armies devastate Khwarezmian cities including Samarkand and Bukhara.",
    },
    {
      year: 1220,
      title: "Destruction of Samarkand",
      description:
        "Genghis Khan’s invasion devastates but later revitalizes Central Asia.",
    },
    {
      year: 1258,
      title: "Mongols Sack Baghdad",
      description:
        "End of the Abbasid Caliphate and massive Mongol expansion across Eurasia.",
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
        "Timur transforms Samarkand into a center of architecture and culture.",
    },
    {
      year: 1405,
      title: "Death of Timur",
      description:
        "Timur dies during his campaign to China, ending his conquests.",
    },
    {
      year: 1469,
      title: "Ulugh Beg’s Astronomical Legacy",
      description:
        "His observatory in Samarkand produces world-leading star catalogs.",
    },

    // ======== EARLY MODERN ERA ========
    {
      year: 1500,
      title: "Shaybani Khan Captures Samarkand",
      description: "The Uzbek Shaybanids establish control over Central Asia.",
    },
    {
      year: 1517,
      title: "Ottomans Conquer Egypt",
      description:
        "End of the Mamluk Sultanate; Ottomans dominate the Islamic world.",
    },
    {
      year: 1588,
      title: "Reign of Shah Abbas I Begins",
      description:
        "Safavid Persia experiences cultural and architectural flourishing.",
    },
    {
      year: 1644,
      title: "Qing Dynasty Established in China",
      description: "Manchu conquest ushers in China’s last imperial dynasty.",
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
      year: 1796,
      title: "Rise of Qajar Dynasty",
      description:
        "New Persian dynasty emerges as regional powers shift in Central Asia.",
    },

    // ======== INDUSTRIAL & IMPERIAL ERA ========
    {
      year: 1813,
      title: "Russian Expansion into the Caucasus",
      description:
        "Treaty of Gulistan marks Russian dominance over northern Persia’s territories.",
    },
    {
      year: 1868,
      title: "Russian Conquest of Samarkand",
      description:
        "Russian Empire annexes Samarkand and Bukhara, ending local independence.",
    },
    {
      year: 1884,
      title: "Berlin Conference",
      description:
        "European powers divide Africa, intensifying global imperialism.",
    },
    {
      year: 1905,
      title: "First Russian Revolution",
      description:
        "Social unrest foreshadows the collapse of the Tsarist regime.",
    },
    {
      year: 1914,
      title: "World War I Begins",
      description:
        "A global conflict reshapes borders, empires, and ideologies.",
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
      year: 1939,
      title: "World War II Begins",
      description:
        "Global conflict reshapes politics, economics, and alliances worldwide.",
    },
    {
      year: 1945,
      title: "End of World War II",
      description:
        "Defeat of Axis powers leads to Soviet dominance in Eastern Europe and Central Asia’s integration into USSR structure.",
    },

    // ======== CONTEMPORARY ERA ========
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
      year: 2001,
      title: "21st Century Globalization",
      description:
        "Digital revolution, climate awareness, and global connectivity redefine economics and politics.",
    },
    {
      year: 2016,
      title: "Shavkat Mirziyoyev Becomes President",
      description:
        "A new era of reform and modernization begins in Uzbekistan.",
    },
    {
      year: 2025,
      title: "Regional Connectivity Projects Expand",
      description:
        "Uzbekistan strengthens ties with China, Europe, and neighboring states through new infrastructure projects.",
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

  const gapBefore1800 = 140;
  const gapAfter1800 = 140;

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
      animate={{ height: expanded ? 500 : 200 }}
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

            // === Special event (e.g., Year 0) ===
            if (event.isSpecial) {
              const isActive = activeIndex === i;

              return (
                <motion.div
                  key={i}
                  className={styles.specialEventNode}
                  style={{ left: `${getLeft(event.year)}px` }}
                  onClick={() => handleClick(i)} // ✅ make it clickable
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className={`${styles.specialMarker} ${
                      isActive ? styles.activeSpecial : ""
                    }`}
                  >
                    Anno Domini
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={`${styles.eventTooltip} ${styles.tooltipAbove}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.tooltipContent}>
                          <h4 className={styles.tooltipTitle}>{event.title}</h4>
                          <p className={styles.tooltipYear}>
                            {event.year === 0
                              ? "Year 0 (AD Era Begins)"
                              : event.year}
                          </p>
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

            // === Normal events ===
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
