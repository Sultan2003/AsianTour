import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { FaArrowUp } from "react-icons/fa";
import styles from "./MainLayout.module.scss"; // use module for button

const MainLayout = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false);

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
