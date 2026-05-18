import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/background/Logo 2.png";
import AnimatedLogo from "../../../public/assets/animatedlogo/logo";
import { PhoneIcon } from "../../assets/icons/icons";
import TranslateWidget from "../TranslateWidget/TranslateWidget";

export default function Header({ onLoginClick }) {
  const navigate = useNavigate();

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
                  placeholder="Search tours..."
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
                  <strong>Destinations</strong>
                  {[
                    "Kazakhstan",
                    "Kyrgyzstan",
                    "Tajikistan",
                    "Turkmenistan",
                    "Uzbekistan",
                  ].map((d) => (
                    <label key={d}>
                      <input
                        type="checkbox"
                        value={d}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDestinations([
                              ...selectedDestinations,
                              d,
                            ]);
                          } else {
                            setSelectedDestinations(
                              selectedDestinations.filter((item) => item !== d),
                            );
                          }
                        }}
                      />
                      {d}
                    </label>
                  ))}
                </div>

                {/* MONTH */}
                <div className={styles.searchItem}>
                  <strong>Departure</strong>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option value="">Any Month</option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TOUR TYPE */}
                <div className={styles.searchItem}>
                  <strong>Tour Type</strong>

                  <label>
                    <input
                      type="radio"
                      name="tourType"
                      onChange={() => setTourType("Group")}
                    />
                    Group
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="tourType"
                      onChange={() => setTourType("Private")}
                    />
                    Private
                  </label>
                </div>

                {/* SEARCH BUTTON */}
                <button className={styles.searchBtn} onClick={handleSearch}>
                  Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className={styles.actions}>
            <NavLink className={styles.navlink} to="/about">
              About Us
            </NavLink>

            <NavLink className={styles.navlink} to="/contact">
              Contact
            </NavLink>
            <TranslateWidget />

            {/* ✅ NEW PHONE BLOCK */}
            <div className={styles.callUs}>
              <div className={styles.phoneIcon}>
                <PhoneIcon />
              </div>

              <div className={styles.phoneText}>
                <span>Call Us:</span>
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
            Destinations ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "destinations" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/silk-road" onClick={handleMenuLinkClick}>
                Silk Road
              </Link>
              <Link to="/central-asia" onClick={handleMenuLinkClick}>
                Central Asia
              </Link>
              <Link to="/uzbekistan" onClick={handleMenuLinkClick}>
                Uzbekistan
              </Link>
              <Link to="/kazakhstan" onClick={handleMenuLinkClick}>
                Kazakhstan
              </Link>
              <Link to="/kyrgyzstan" onClick={handleMenuLinkClick}>
                Kyrgyzstan
              </Link>
              <Link to="/tajikistan" onClick={handleMenuLinkClick}>
                Tajikistan
              </Link>
              <Link to="/turkmenistan" onClick={handleMenuLinkClick}>
                Turkmenistan
              </Link>
              <Link to="/caucasus" onClick={handleMenuLinkClick}>
                Caucasus
              </Link>
              <Link to="/armenia" onClick={handleMenuLinkClick}>
                Armenia
              </Link>
              <Link to="/azerbaijan" onClick={handleMenuLinkClick}>
                Azerbaijan
              </Link>
              <Link to="/georgia" onClick={handleMenuLinkClick}>
                Georgia
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("groupTours")}
            className={styles.menuTrigger}
          >
            Group Tours ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "groupTours" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/silk-road-tours" onClick={handleMenuLinkClick}>
                Silk Road Group Tours
              </Link>
              <Link to="/central-asia-tours" onClick={handleMenuLinkClick}>
                Central Asia Group Tours
              </Link>
              <Link to="/uzbek-tours" onClick={handleMenuLinkClick}>
                Uzbekistan Group Tours
              </Link>
              <Link to="/kazakh-tours" onClick={handleMenuLinkClick}>
                Kazakhstan Group Tours
              </Link>
              <Link to="/kyrgyz-tours" onClick={handleMenuLinkClick}>
                Kyrgyzstan Group Tours
              </Link>
              <Link to="/tajik-tours" onClick={handleMenuLinkClick}>
                Tajikistan Group Tours
              </Link>
              <Link to="/turkmen-tours" onClick={handleMenuLinkClick}>
                Turkmenistan Group Tours
              </Link>
              <Link to="/caucasus-tours" onClick={handleMenuLinkClick}>
                Caucasus Group Tours
              </Link>
              <Link to="/armenia-tours" onClick={handleMenuLinkClick}>
                Armenia Group Tours
              </Link>
              <Link to="/azerbaijan-tours" onClick={handleMenuLinkClick}>
                Azerbaijan Group Tours{" "}
              </Link>
              <Link to="/georgia-tours" onClick={handleMenuLinkClick}>
                Georgia Group Tours
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("privateTours")}
            className={styles.menuTrigger}
          >
            Private Tours ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "privateTours" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/silk-road-private-tours" onClick={handleMenuLinkClick}>
                Silk Road Private Tours
              </Link>
              <Link
                to="/central-asia-private-tours"
                onClick={handleMenuLinkClick}
              >
                Central Asia Private Tours
              </Link>
              <Link
                to="/uzbekistan-private-tours"
                onClick={handleMenuLinkClick}
              >
                Uzbekistan Private Tours
              </Link>
              <Link
                to="/kazakhstan-private-tours"
                onClick={handleMenuLinkClick}
              >
                Kazakhstan Private Tours
              </Link>
              <Link
                to="/kyrgyzstan-private-tours"
                onClick={handleMenuLinkClick}
              >
                Kyrgyzstan Private Tours
              </Link>
              <Link
                to="/tajikistan-private-tours"
                onClick={handleMenuLinkClick}
              >
                Tajikistan Private Tours
              </Link>
              <Link
                to="/turkmenistan-private-tours"
                onClick={handleMenuLinkClick}
              >
                Turkmenistan Private Tours
              </Link>
              <Link to="/caucasus-private-tours" onClick={handleMenuLinkClick}>
                Caucasus Private Tours
              </Link>
              <Link to="/armenia-private-tours" onClick={handleMenuLinkClick}>
                Armenia Private Tours
              </Link>
              <Link
                to="/azerbaijan-private-tours"
                onClick={handleMenuLinkClick}
              >
                Azerbaijan Private Tours
              </Link>
              <Link to="/georgia-private-tours" onClick={handleMenuLinkClick}>
                Georgia Private Tours
              </Link>
              <Link to="/tailor-private-tours" onClick={handleMenuLinkClick}>
                Tailor Made Private Tours
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span
            onClick={() => handleMenuToggle("services")}
            className={styles.menuTrigger}
          >
            Services ▾
          </span>
          <div
            className={`${styles.dropdown} ${openMobileMenu === "services" ? styles.show : ""}`}
          >
            <div className={styles.dropdownGrid}>
              <Link to="/transfer" onClick={handleMenuLinkClick}>
                Transfer
              </Link>
              <Link to="/hotels" onClick={handleMenuLinkClick}>
                Hotels
              </Link>
              <span>Guide Service</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
