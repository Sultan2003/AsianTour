import React, { useState } from "react";
import styles from "./timeline.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import pyramid from "../../assets/timeline/pyramid.jpg";
import olympic from "../../assets/timeline/olympic.jpg";

const HistoricalTimeline = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const events = [
    {
      year: -2560,
      title: "Construction of the Great Pyramid of Giza",
      image: pyramid,
      description:
        "Built in Egypt, one of the Seven Wonders of the Ancient World.",
    },
    {
      year: -776,
      title: "First Ancient Olympic Games",
      image: olympic,
      description: "Held in Olympia, Greece, celebrating human athleticism.",
    },
    {
      year: -221,
      title: "Unification of China under Qin Dynasty",
      image: "/images/china.jpg",
      description:
        "Qin Shi Huang unifies China and begins building the Great Wall.",
    },
    {
      year: -44,
      title: "Assassination of Julius Caesar",
      image: "/images/caesar.jpg",
      description:
        "A turning point in Roman history leading to the rise of the Empire.",
    },
    {
      year: 476,
      title: "Fall of the Western Roman Empire",
      image: "/images/rome.jpg",
      description:
        "Marks the end of ancient Rome and the start of the Middle Ages.",
    },
    {
      year: 622,
      title: "Hijra: Founding of Islam",
      image: "/images/islam.jpg",
      description:
        "Prophet Muhammad migrates to Medina — year 1 in the Islamic calendar.",
    },
    {
      year: 1206,
      title: "Rise of the Mongol Empire",
      image: "/images/mongol.jpg",
      description:
        "Genghis Khan unites Mongol tribes into the largest land empire ever.",
    },
    {
      year: 1492,
      title: "Columbus Reaches the Americas",
      image: "/images/columbus.jpg",
      description: "Marks the start of European exploration of the New World.",
    },
    {
      year: 1776,
      title: "American Declaration of Independence",
      image: "/images/usa.jpg",
      description:
        "Birth of the United States; symbol of democratic revolution.",
    },
    {
      year: 1969,
      title: "First Moon Landing",
      image: "/images/moon.jpg",
      description:
        "Neil Armstrong takes 'one small step for man, one giant leap for mankind.'",
    },
  ];

  const minYear = Math.min(...events.map((e) => e.year)) - 100;
  const maxYear = Math.max(...events.map((e) => e.year)) + 100;
  const step = 200;

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
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setActiveIndex(null);
      }}
      animate={{ height: expanded ? 400 : 80 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className={styles.timelineInner}>
        <div
          className={styles.timelineWrapper}
          style={{ width: `${totalWidth + 200}px` }}
        >
          {/* Timeline line */}
          <div
            className={styles.timelineLine}
            style={{ width: `${totalWidth + 200}px` }}
          ></div>

          {/* Year Marks */}
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

          {/* Events */}
          {events.map((event, i) => {
            const isAbove = i % 2 === 0; // ✅ 1st above, 2nd below, etc.
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
