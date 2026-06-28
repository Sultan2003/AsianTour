import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { FaArrowUp } from "react-icons/fa";
import styles from "./MainLayout.module.scss"; // use module for button
import { LanguageContext } from "../../context/LanguageContext";
import TranslateWidget from "../TranslateWidget/TranslateWidget";

const MainLayout = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false);
  const { lang } = useContext(LanguageContext);

  // 👇 show button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 scroll to top on click
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.mainLayout}>
      <Header />
      <TranslateWidget
        hideButton
        targetLanguage={lang === "ru" ? "ru" : "en"}
      />

      <main>{children}</main>

      {/* 🔥 Scroll To Top Button */}
      {showScroll && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default MainLayout;
