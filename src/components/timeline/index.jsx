import React, { useState, useRef } from "react";
import styles from "./timeline.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import olympic from "../../assets/timeline/olympic.jpg";
import achaemenid from "../../assets/timeline/Achaemenid Empire Founded 550ВС.jpg";
import alexanderPersia from "../../assets/timeline/Alexander Conquers Persia 331 BC.png";
import alexanderCA from "../../assets/timeline/Alexander in Central Asia  327ВС.png";
import caesar from "../../assets/timeline/Assassination of Julius Caesar 44 BC.png";
import marathon from "../../assets/timeline/Battle of Marathon Greek 490ВС.jpg";
import talas from "../../assets/timeline/Battle of Talas 751AD.png";
import timurBirth from "../../assets/timeline/Birth of Amir Timur 1336AD.png";
import constantinople from "../../assets/timeline/Constantino  Founded 330AD.png";
import cyrusBabylon from "../../assets/timeline/cyrus captures babylon 539ВС.png";
import samarkandDestroyed from "../../assets/timeline/Destruction of Samarkand 1220AD.png";
import baghdadFall from "../../assets/timeline/Fall of Baghdad 1258AD.png";
import ninevehFall from "../../assets/timeline/Fall of Nineveh 612ВС.jpg";
import romeFall from "../../assets/timeline/Fall of Western Rome 476 AD.png";
import firstCrusade from "../../assets/timeline/First Crusade 1096AD.png";
import firstKhaganate from "../../assets/timeline/First Turkish Khagabate 552AD.png";
import carthage from "../../assets/timeline/Founding of Carthage 814ВС.jpg";
import bactria from "../../assets/timeline/Greco-Bactrian Kingdom 256 BC.png";
import hanWest from "../../assets/timeline/Han Dynasty Expands West 141 BC.png";
import hijra from "../../assets/timeline/Hijra Birth of Islam 622AD.png";
import islamCA from "../../assets/timeline/Islam Reaches Central Asia 651AD.png";
import karakhanids from "../../assets/timeline/Karakhanids take transoxiana 999AD.png";
import mongolsCA from "../../assets/timeline/Mongols invade Central Asia 1219AD.png";
import qin from "../../assets/timeline/Qin unifies China 221BC.jpg";
import tiglath from "../../assets/timeline/Reforms of tiglath pileser III 745ВС.png";
import sassanid from "../../assets/timeline/Rise of Sassanid Empire 224 AD.png";
import neoAssyrian from "../../assets/timeline/Rise of the Neo-Assyrian Empire 921ВС.jpg";
import romeCarthage from "../../assets/timeline/Rome Destroys Carthage 146 BC.png";
import samanids from "../../assets/timeline/Samanids in Bukhara 819AD.png";
import seljuks from "../../assets/timeline/Seljuks Enter Baghdad 1055AD.png";
import thermopylae from "../../assets/timeline/Thermopylae & Salamis 480 BC.png";

const HistoricalTimeline = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollRef = useRef(null);

  // === EVENTS DATA (unchanged) ===
  const events = [
    {
      year: -911,
      title: "Rise of the Neo-Assyrian Empire",
      image: neoAssyrian,
      description:
        "This period marks the rise of one of the world's most powerful early empires. Travelers visiting ancient sites in Iraq or the wider region can still see the influence of Assyrian art, stone carvings, and architectural styles that shaped later civilizations. This era laid the foundation for road networks, trade routes, and administrative systems that later connected Asia, the Middle East, and Central Asia. It’s a glimpse into how early states organized massive territories long before modern countries existed.",
    },
    {
      year: -814,
      title: "Founding of Carthage",
      image: carthage,
      description:
        "Carthage began as a Phoenician trading colony and later grew into one of the Mediterranean’s most influential cities. Its history helps travelers understand how maritime trade once shaped cultural connections across Europe, Africa, and Asia. Many traditions in Mediterranean cuisine, craftsmanship, and navigation trace back to this era. The Carthaginian story also adds depth to understanding ancient trade routes leading toward Central Asia",
    },
    {
      year: -776,
      title: "First Ancient Olympic Games",
      image: olympic,
      description:
        "The first Olympic Games were held in Olympia, Greece, creating a tradition that still attracts millions of travelers today. Visitors to the region can explore the original stadium, temples, and ruins that inspired modern sports culture. This event also highlights how ancient societies celebrated peace, athleticism, and unity—values that influenced civilizations across Eurasia, including Central Asia along the Silk Road",
    },
    {
      year: -745,
      title: "Reforms of Tiglath-Pileser III",
      image: tiglath,
      description:
        "This Assyrian king reorganized the empire, improving roads, communication, and military structure. For travelers, this period shows how some of the earliest 'administrative systems' in history allowed goods, ideas, and cultures to travel long distances. These early networks contributed to the routes that would later connect Mesopotamia to Central Asia",
    },
    {
      year: -612,
      title: "Fall of Nineveh",
      image: ninevehFall,
      description:
        "The dramatic fall of Nineveh marked the end of a major ancient empire. Today, travelers visiting northern Iraq can explore archaeological remains that tell the story of this once-great capital. The collapse reshaped regional powers and slowly opened new paths for trade toward Persia and Central Asia. It’s a reminder of how ancient cities rose and fell, but their cultural traces still influence art and architecture across the region.",
    },
    {
      year: -550,
      title: "Achaemenid Empire Founded",
      image: achaemenid,
      description:
        "Cyrus the Great established one of history’s largest and most diverse empires. Travelers visiting Iran and Central Asia can experience monumental palaces, ancient inscriptions, and early road systems like the Royal Road. This period deeply influenced Central Asian culture, from language to architecture, and played a major role in shaping the Silk Road. It’s a key moment for anyone interested in the shared heritage of Iran and Uzbekistan.",
    },
    {
      year: -539,
      title: "Cyrus Captures Babylon",
      image: cyrusBabylon,
      description:
        "When Cyrus took Babylon, he introduced new ideas of governance, tolerance, and cultural unity. Travelers exploring modern-day Iraq and Iran can find artifacts and museums that highlight this moment, including the famous Cyrus Cylinder. This event also strengthened Persia’s connection to Central Asia, eventually shaping trade and cultural exchange along the Silk Road.",
    },
    {
      year: -490,
      title: "Battle of Marathon",
      image: marathon,
      description:
        "The Greek victory at Marathon became a legendary symbol of bravery and independence. Visitors to Greece can still walk the battlefield and learn how this event influenced Western military history. For travelers in Asia, it’s important because it marks a crucial phase in the long interaction between Greek and Persian civilizations—cultures that would later blend dramatically in Central Asia under Alexander the Great.",
    },
    {
      year: -480,
      title: "Thermopylae & Salamis",
      image: thermopylae,
      description:
        "These iconic battles between Greece and Persia shaped regional history and are popular attractions for cultural tourists. Thermopylae represents heroic resistance, while Salamis showcases naval strategy that changed the ancient world. These clashes between East and West influenced the balance of power that eventually allowed Alexander the Great to reach Central Asia, leaving long-lasting cultural landmarks in Uzbekistan.",
    },
    {
      year: -331,
      title: "Alexander Conquers Persia",
      image: alexanderPersia,
      description:
        "Alexander’s conquest opened the door to one of the most fascinating cultural blends in history—Greek and Central Asian traditions merging together. Travelers visiting Uzbekistan can still see traces of Hellenistic architecture, coins, and city layouts, especially in places like Termez and Samarkand. This conquest created new trade routes, artistic styles, and urban centers that shaped the future of the Silk Road.",
    },
    {
      year: -327,
      title: "Alexander in Central Asia",
      image: alexanderCA,
      description:
        "Alexander’s conquest opened the door to one of the most fascinating cultural blends in history—Greek and Central Asian traditions merging together. Travelers visiting Uzbekistan can still see traces of Hellenistic architecture, coins, and city layouts, especially in places like Termez and Samarkand. This conquest created new trade routes, artistic styles, and urban centers that shaped the future of the Silk Road.",
    },
    {
      year: -256,
      title: "Greco-Bactrian Kingdom",
      image: bactria,
      description: "Hellenistic culture spreads in Central Asia.",
    },
    {
      year: -221,
      title: "Qin Unifies China",
      image: qin,
      description: "Qin Shi Huang establishes first empire.",
    },
    {
      year: -146,
      title: "Rome Destroys Carthage",
      image: romeCarthage,
      description: "End of Punic Wars.",
    },
    {
      year: -141,
      title: "Han Dynasty Expands West",
      image: hanWest,
      description: "Silk Road begins forming.",
    },
    {
      year: -44,
      title: "Assassination of Julius Caesar",
      image: caesar,
      description: "End of Roman Republic.",
    },
    {
      year: 0,
      title: "Birth of Jesus Christ",
      description: "Beginning of AD era.",
      isSpecial: true,
    },
    {
      year: 224,
      title: "Rise of Sassanid Empire",
      image: sassanid,
      description: "Ardashir I founds new empire.",
    },
    {
      year: 330,
      title: "Constantinople Founded",
      image: constantinople,
      description: "New Roman capital.",
    },
    {
      year: 476,
      title: "Fall of Western Rome",
      image: romeFall,
      description: "Traditional end of Roman Empire.",
    },
    {
      year: 552,
      title: "First Turkic Khaganate",
      image: firstKhaganate,
      description: "Beginning of Turkic statehood.",
    },
    {
      year: 622,
      title: "Hijra — Birth of Islam",
      image: hijra,
      description: "Year 1 in Islamic calendar.",
    },
    {
      year: 651,
      title: "Islam Reaches Central Asia",
      image: islamCA,
      description: "Caliphates expand.",
    },
    {
      year: 751,
      title: "Battle of Talas",
      image: talas,
      description: "Papermaking spreads to Islamic world.",
    },
    {
      year: 819,
      title: "Samanids in Bukhara",
      image: samanids,
      description: "Cultural Golden Age.",
    },
    {
      year: 999,
      title: "Karakhanids Take Transoxiana",
      image: karakhanids,
      description: "First Turkic Muslim state.",
    },
    {
      year: 1055,
      title: "Seljuks Enter Baghdad",
      image: seljuks,

      description: "Turkic influence spreads.",
    },
    {
      year: 1096,
      title: "First Crusade",
      image: firstCrusade,
      description: "Western crusaders invade Near East.",
    },
    {
      year: 1219,
      title: "Mongols Invade Central Asia",
      image: mongolsCA,
      description: "Destruction of cities.",
    },
    {
      year: 1220,
      title: "Destruction of Samarkand",
      image: samarkandDestroyed,
      description: "Mongol invasion.",
    },
    {
      year: 1258,
      title: "Fall of Baghdad",
      image: baghdadFall,
      description: "End of Abbasid rule.",
    },
    {
      year: 1336,
      title: "Birth of Amir Timur",
      image: timurBirth,
      description: "Founder of Timurid Empire.",
    },
    {
      year: 1369,
      title: "Samarkand — Timurid Capital",
      description: "Cultural renaissance.",
    },
    {
      year: 1405,
      title: "Death of Timur",
      description: "Ends conquest campaigns.",
    },
    {
      year: 1469,
      title: "Ulugh Beg’s Legacy",
      description: "Astronomy revolution.",
    },
    {
      year: 1500,
      title: "Shaybanid Conquest",
      description: "Uzbek statehood rises.",
    },
    {
      year: 1517,
      title: "Ottomans Take Egypt",
      description: "Islamic world unified.",
    },
    { year: 1588, title: "Shah Abbas I", description: "Safavid Golden Age." },
    {
      year: 1644,
      title: "Qing Dynasty Begins",
      description: "Last dynasty of China.",
    },
    {
      year: 1740,
      title: "Nadir Shah Invades CA",
      description: "Persian expansion.",
    },
    {
      year: 1776,
      title: "American Independence",
      description: "Birth of USA.",
    },
    { year: 1796, title: "Qajar Dynasty", description: "New Persian rule." },
    {
      year: 1813,
      title: "Russia in Caucasus",
      description: "Treaty of Gulistan.",
    },
    {
      year: 1868,
      title: "Russia Takes Samarkand",
      description: "End of independence.",
    },
    {
      year: 1884,
      title: "Berlin Conference",
      description: "Peak colonialism.",
    },
    {
      year: 1905,
      title: "Russian Revolution Begins",
      description: "Tsarist decline.",
    },
    { year: 1914, title: "World War I", description: "Global conflict." },
    {
      year: 1917,
      title: "Russian Revolution",
      description: "USSR begins forming.",
    },
    {
      year: 1924,
      title: "Uzbek SSR Formed",
      description: "Beginning of Soviet era.",
    },
    { year: 1939, title: "World War II", description: "Global conflict." },
    { year: 1945, title: "End of WWII", description: "New world order." },
    {
      year: 1966,
      title: "Tashkent Earthquake",
      description: "Rebuilt in Soviet style.",
    },
    {
      year: 1991,
      title: "Independence of Uzbekistan",
      description: "Post-Soviet statehood.",
    },
    {
      year: 2001,
      title: "21st Century Globalization",
      description: "Digital revolution.",
    },
    { year: 2016, title: "Mirziyoyev Presidency", description: "Reform era." },
    {
      year: 2025,
      title: "Connectivity Projects",
      description: "New infrastructure.",
    },
  ];

  // === MIXED YEAR SPACING (unchanged) ===
  const minYear = Math.min(...events.map((e) => e.year)) - 50;
  const maxYear = Math.max(...events.map((e) => e.year)) + 50;

  const stepBefore = 40;
  const stepAfter = 10;
  const gap = 200;

  const years = [];
  for (let y = minYear; y < 1800; y += stepBefore) years.push(y);
  for (let y = 1800; y <= maxYear; y += stepAfter) years.push(y);

  const beforeCount = Math.floor((1800 - minYear) / stepBefore);
  const afterCount = Math.floor((maxYear - 1800) / stepAfter) + 1;

  const totalWidth = beforeCount * gap + afterCount * gap;

  const getLeft = (year) => {
    if (year < 1800) {
      return ((year - minYear) / stepBefore) * gap;
    }
    return beforeCount * gap + ((year - 1800) / stepAfter) * gap;
  };

  const handleClick = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <motion.div
      className={`${styles.timelineContainer} ${
        expanded ? styles.expanded : ""
      }`}
      ref={scrollRef}
      style={{ cursor: "default" }} // ⬅ cursor not grab
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setActiveIndex(null);
      }}
      animate={{ height: expanded ? 500 : 220 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={styles.timelineInner}>
        <div
          className={styles.timelineWrapper}
          style={{ width: `${totalWidth}px` }}
        >
          <div
            className={styles.timelineLine}
            style={{ width: `${totalWidth}px` }}
          />

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
            const isActive = activeIndex === i;

            if (event.isSpecial) {
              return (
                <div
                  key={i}
                  className={styles.specialEventNode}
                  style={{ left: `${getLeft(event.year)}px` }}
                  onClick={() => handleClick(i)}
                >
                  <div
                    className={`${styles.specialMarker} ${
                      isActive ? styles.activeSpecial : ""
                    }`}
                  >
                    AD
                  </div>

                  {isActive && (
                    <AnimatePresence>
                      <motion.div
                        className={`${styles.eventTooltip} ${styles.tooltipAbove}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className={styles.tooltipContent}>
                          <h4 className={styles.tooltipTitle}>{event.title}</h4>
                          <p className={styles.tooltipYear}>0 AD</p>
                          <p className={styles.tooltipText}>
                            {event.description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              );
            }

            return (
              <div
                key={i}
                className={`${styles.eventNode} ${
                  isAbove ? styles.above : styles.below
                } ${isActive ? styles.active : ""}`}
                style={{ left: `${getLeft(event.year)}px` }}
                onClick={() => handleClick(i)}
              >
                {expanded && (
                  <>
                    <span className={styles.buttonLabel}>{event.title}</span>
                    <button
                      className={styles.eventButton}
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className={styles.overlay}></div>
                    </button>

                    {isActive && (
                      <AnimatePresence>
                        <motion.div
                          className={`${styles.eventTooltip} ${
                            isAbove ? styles.tooltipAbove : styles.tooltipBelow
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
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
                      </AnimatePresence>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default HistoricalTimeline;
