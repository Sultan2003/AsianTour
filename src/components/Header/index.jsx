import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/background/Logo 2.png";
import AnimatedLogo from "../../../public/assets/animatedlogo/logo";
import { PhoneIcon } from "../../assets/icons/icons";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header({ onLoginClick }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [compact, setCompact] = useState(false);

  // ✅ SEARCH LOGIC FROM HEADER1
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [tourType, setTourType] = useState("");
  const [openMobileMenu, setOpenMobileMenu] = useState(null);
  const searchRef = useRef(null);
  const navRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams({
      destinations: selectedDestinations.join(","),
      month: selectedMonth,
      type: tourType,
    }).toString();

    navigate(`/search?${query}`);
  };

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTapMenuEnabled = () =>
    window.matchMedia("(hover: none), (pointer: coarse)").matches ||
    window.innerWidth <= 1024;

  const handleMenuToggle = (menuKey) => {
    if (!isTapMenuEnabled()) return;

    setOpenMobileMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleMenuLinkClick = () => {
    setOpenMobileMenu(null);
  };

  useEffect(() => {
    const handleOutsideMenuClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMobileMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideMenuClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideMenuClick);
    };
  }, []);

  return (
    <header className={`${styles.header} ${compact ? styles.compact : ""}`}>
      {/* TOP ROW */}
      <div className={`${styles.topRow} ${compact ? styles.topHidden : ""}`}>
        <div>
          {/* LOGO */}
          <div className={styles.logo} onClick={() => navigate("/")}>
            <AnimatedLogo />
          </div>

          {/* ✅ NEW SEARCH (FROM HEADER1 LOGIC) */}
          <div className={styles.searchWrapper} ref={searchRef}>
            <form className={styles.form}>
              <label>
                {/* INPUT */}
                <input
                  className={styles.input}
                  type="text"
                  placeholder={t("search.placeholder")}
                  required
                  onClick={() => setOpenFilter(!openFilter)}
                />

                {/* SEARCH ICON */}
                <svg className={styles.search} viewBox="0 0 24 24">
                  <path d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {/* CLEAR BUTTON */}
                <button type="reset" className={styles.closeBtn}>
                  ✕
                </button>

                {/* BACKGROUND */}
                <div className={styles.fancyBg}></div>
              </label>
            </form>

            {/* 🔽 DROPDOWN (UNCHANGED LOGIC) */}
            {openFilter && (
              <div className={styles.searchDropdown}>
                {/* DESTINATIONS */}
                <div className={styles.searchItem}>
                  <strong>{t("search.destinations")}</strong>
                  {[
                    { value: "Kazakhstan", label: t("nav.kazakhstan") },
                    { value: "Kyrgyzstan", label: t("nav.kyrgyzstan") },
                    { value: "Tajikistan", label: t("nav.tajikistan") },
                    { value: "Turkmenistan", label: t("nav.turkmenistan") },
                    { value: "Uzbekistan", label: t("nav.uzbekistan") },
                  ].map((d) => (
                    <label key={d.value}>
                      <input
                        type="checkbox"
                        value={d.value}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDestinations([
                              ...selectedDestinations,
                              d.value,
                            ]);
                          } else {
                            setSelectedDestinations(
                              selectedDestinations.filter((item) => item !== d.value),
                            );
                          }
                        }}
                      />
                      {d.label}
                    </label>
                  ))}
                </div>

                {/* MONTH */}
                <div className={styles.searchItem}>
                  <strong>{t("search.departure")}</strong>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">{t("search.anyMonth")}</option>
                    {[
                      ["Jan", t("search.months.jan")],
                      ["Feb", t("search.months.feb")],
                      ["Mar", t("search.months.mar")],
                      ["Apr", t("search.months.apr")],
                      ["May", t("search.months.may")],
                      ["Jun", t("search.months.jun")],
                      ["Jul", t("search.months.jul")],
                      ["Aug", t("search.months.aug")],
                      ["Sep", t("search.months.sep")],
                      ["Oct", t("search.months.oct")],
                      ["Nov", t("search.months.nov")],
                      ["Dec", t("search.months.dec")],
                    ].map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TOUR TYPE */}
                <div className={styles.searchItem}>
                  <strong>{t("search.tourType")}</strong>

                  <label>
                    <input
                      type="radio"
                      name="tourType"
                      onChange={() => setTourType("Group")}
                    />
                    {t("search.group")}
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="tourType"
                      onChange={() => setTourType("Private")}
                    />
                    {t("search.private")}
                  </label>
                </div>

                {/* SEARCH BUTTON */}
                <button className={styles.searchBtn} onClick={handleSearch}>
                  {t("search.search")}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className={styles.actions}>
            <NavLink className={styles.navlink} to="/about">
              {t("nav.aboutUs")}
            </NavLink>

            <NavLink className={styles.navlink} to="/contact">
              {t("nav.contact")}
            </NavLink>
            <LanguageSwitcher />

            {/* ✅ NEW PHONE BLOCK */}
            <div className={styles.callUs}>
              <div className={styles.phoneIcon}>
                <PhoneIcon />
              </div>

              <div className={styles.phoneText}>
                <span>{t("contact.callUs")}</span>
                <a href="tel:+998933988531" className={styles.phoneNumber}>
                  <strong>+998-93-398-85-31</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ NAVIGATION FROM HEADER1 */}
      <nav
        className={`${styles.bottomRow} ${openMobileMenu ? styles.menuOpen : ""}`}
        ref={navRef}
      >
        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("destinations")}
            className={styles.menuTrigger}
          >
            {t("nav.destinations")} ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "destinations" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/silk-road" onClick={handleMenuLinkClick}>
                {t("nav.silkRoad")}
              </Link>
              <Link to="/central-asia" onClick={handleMenuLinkClick}>
                {t("nav.centralAsia")}
              </Link>
              <Link to="/uzbekistan" onClick={handleMenuLinkClick}>
                {t("nav.uzbekistan")}
              </Link>
              <Link to="/kazakhstan" onClick={handleMenuLinkClick}>
                {t("nav.kazakhstan")}
              </Link>
              <Link to="/kyrgyzstan" onClick={handleMenuLinkClick}>
                {t("nav.kyrgyzstan")}
              </Link>
              <Link to="/tajikistan" onClick={handleMenuLinkClick}>
                {t("nav.tajikistan")}
              </Link>
              <Link to="/turkmenistan" onClick={handleMenuLinkClick}>
                {t("nav.turkmenistan")}
              </Link>
              <Link to="/caucasus" onClick={handleMenuLinkClick}>
                {t("nav.caucasus")}
              </Link>
              <Link to="/armenia" onClick={handleMenuLinkClick}>
                {t("nav.armenia")}
              </Link>
              <Link to="/azerbaijan" onClick={handleMenuLinkClick}>
                {t("nav.azerbaijan")}
              </Link>
              <Link to="/georgia" onClick={handleMenuLinkClick}>
                {t("nav.georgia")}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("groupTours")}
            className={styles.menuTrigger}
          >
            {t("nav.groupTours")} ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "groupTours" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/silk-road-tours" onClick={handleMenuLinkClick}>
                {t("nav.silkRoadGroupTours")}
              </Link>
              <Link to="/central-asia-tours" onClick={handleMenuLinkClick}>
                {t("nav.centralAsiaGroupTours")}
              </Link>
              <Link to="/uzbek-tours" onClick={handleMenuLinkClick}>
                {t("nav.uzbekistanGroupTours")}
              </Link>
              <Link to="/kazakh-tours" onClick={handleMenuLinkClick}>
                {t("nav.kazakhstanGroupTours")}
              </Link>
              <Link to="/kyrgyz-tours" onClick={handleMenuLinkClick}>
                {t("nav.kyrgyzstanGroupTours")}
              </Link>
              <Link to="/tajik-tours" onClick={handleMenuLinkClick}>
                {t("nav.tajikistanGroupTours")}
              </Link>
              <Link to="/turkmen-tours" onClick={handleMenuLinkClick}>
                {t("nav.turkmenistanGroupTours")}
              </Link>
              <Link to="/caucasus-tours" onClick={handleMenuLinkClick}>
                {t("nav.caucasusGroupTours")}
              </Link>
              <Link to="/armenia-tours" onClick={handleMenuLinkClick}>
                {t("nav.armeniaGroupTours")}
              </Link>
              <Link to="/azerbaijan-tours" onClick={handleMenuLinkClick}>
                {t("nav.azerbaijanGroupTours")}{" "}
              </Link>
              <Link to="/georgia-tours" onClick={handleMenuLinkClick}>
                {t("nav.georgiaGroupTours")}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("privateTours")}
            className={styles.menuTrigger}
          >
            {t("nav.privateTours")} ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "privateTours" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/silk-road-private-tours" onClick={handleMenuLinkClick}>
                {t("nav.silkRoadPrivateTours")}
              </Link>
              <Link
                to="/central-asia-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.centralAsiaPrivateTours")}
              </Link>
              <Link
                to="/uzbekistan-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.uzbekistanPrivateTours")}
              </Link>
              <Link
                to="/kazakhstan-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.kazakhstanPrivateTours")}
              </Link>
              <Link
                to="/kyrgyzstan-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.kyrgyzstanPrivateTours")}
              </Link>
              <Link
                to="/tajikistan-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.tajikistanPrivateTours")}
              </Link>
              <Link
                to="/turkmenistan-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.turkmenistanPrivateTours")}
              </Link>
              <Link to="/caucasus-private-tours" onClick={handleMenuLinkClick}>
                {t("nav.caucasusPrivateTours")}
              </Link>
              <Link to="/armenia-private-tours" onClick={handleMenuLinkClick}>
                {t("nav.armeniaPrivateTours")}
              </Link>
              <Link
                to="/azerbaijan-private-tours"
                onClick={handleMenuLinkClick}
              >
                {t("nav.azerbaijanPrivateTours")}
              </Link>
              <Link to="/georgia-private-tours" onClick={handleMenuLinkClick}>
                {t("nav.georgiaPrivateTours")}
              </Link>
              <Link to="/tailor-private-tours" onClick={handleMenuLinkClick}>
                {t("nav.tailorMadePrivateTours")}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("services")}
            className={styles.menuTrigger}
          >
            {t("nav.services")} ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "services" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/transfer" onClick={handleMenuLinkClick}>
                {t("nav.transfer")}
              </Link>
              <Link to="/hotels" onClick={handleMenuLinkClick}>
                {t("nav.hotels")}
              </Link>
              <span>{t("nav.guideService")}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
