import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/background/Logo 2.png";
import { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import headerTranslations from "../../translations/header";

export default function Header() {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const t = headerTranslations[lang];

  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [tourType, setTourType] = useState("");

  const handleSearch = () => {
    const query = new URLSearchParams({
      destinations: selectedDestinations.join(","),
      month: selectedMonth,
      type: tourType,
    }).toString();

    navigate(`/search?${query}`);
  };

  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topLinks}>
          <Link to="/about">{t.about}</Link>
          <Link to="/contact">{t.contact}</Link>
        </div>
      </div>

      {/* Logo + banner */}
      <div className={styles.logoBanner}>
        <Link to="/">
          <img
            src={logo}
            alt="Go To Central Asia Logo"
            className={styles.logo}
          />
        </Link>
        <a
          href="https://www.gotocentralasia.com/tour/8-day-classic-uzbekistan-group-tour-2026-2027"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.banner}
        >
          <span className={styles.badge}>{t.bestSeller}</span>
          <span className={styles.title}>{t.bestSeller2}</span>
          <span className={styles.subtitle}>{t.groupTour}</span>
          <span className={styles.price}>{t.fromPrice}</span>
        </a>
      </div>

      {/* Nav bar */}
      <nav className={styles.navBar}>
        <ul className={styles.navLinks}>
          {/* Destinations */}
          <li className={styles.dropdown}>
            {t.destinations} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/Silk-Road">{t.silkRoadd}</Link>
              </li>
              <li>
                <Link to="/Central-Asia">{t.centralAsiad}</Link>
              </li>
              <li>
                <Link to="/Uzbekistan">{t.uzbekistand}</Link>
              </li>
              <li>
                <Link to="/Kazakhstan">{t.kazakhstand}</Link>
              </li>
              <li>
                <Link to="/Kyrgyzstan">{t.kyrgyzstand}</Link>
              </li>
              <li>
                <Link to="/Tajikistan">{t.tajikistand}</Link>
              </li>
              <li>
                <Link to="/Turkmenistan">{t.turkmenistand}</Link>
              </li>
              <li>
                <Link to="/Caucasus">{t.caucasusd}</Link>
              </li>
              <li>
                <Link to="/Armenia">{t.armeniad}</Link>
              </li>
              <li>
                <Link to="/Azerbaijan">{t.azerbaijand}</Link>
              </li>
              <li>
                <Link to="/Georgia">{t.georgiad}</Link>
              </li>
            </ul>
          </li>

          {/* Group Packages */}
          <li className={styles.dropdown}>
            {t.groupPackages} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/Silk-Road-Tours">{t.silkRoad}</Link>
              </li>
              <li>
                <Link to="/Central-Asia-Tours">{t.centralAsia}</Link>
              </li>
              <li>
                <Link to="/Uzbek-Tours">{t.uzbekistan}</Link>
              </li>
              <li>
                <Link to="/Kazakh-Tours">{t.kazakhstan}</Link>
              </li>
              <li>
                <Link to="/Kyrgyz-Tours">{t.kyrgyzstan}</Link>
              </li>
              <li>
                <Link to="/Tajik-Tours">{t.tajikistan}</Link>
              </li>
              <li>
                <Link to="/Turkmen-Tours">{t.turkmenistan}</Link>
              </li>
              <li>
                <Link to="/Caucas-Tours">{t.caucasus}</Link>
              </li>
              <li>
                <Link to="/Armenia-Tours">{t.armenia}</Link>
              </li>
              <li>
                <Link to="/Azerbaijan-Tours">{t.azerbaijan}</Link>
              </li>
              <li>
                <Link to="/Georgia-Tours">{t.georgia}</Link>
              </li>
            </ul>
          </li>

          {/* Private Tours */}
          <li className={styles.dropdown}>
            {t.privateTours} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/Silk-Road-Private-Tours">{t.silkRoad}</Link>
              </li>
              <li>
                <Link to="/Central-Asia-Private-Tours">{t.centralAsia}</Link>
              </li>
              <li>
                <Link to="/Uzbekistan-Private-Tours">{t.uzbekistan}</Link>
              </li>
              <li>
                <Link to="/Kazakhstan-Private-Tours">{t.kazakhstan}</Link>
              </li>
              <li>
                <Link to="/Kyrgyzstan-Private-Tours">{t.kyrgyzstan}</Link>
              </li>
              <li>
                <Link to="/Tajikistan-Private-Tours">{t.tajikistan}</Link>
              </li>
              <li>
                <Link to="/Turkmenistan-Private-Tours">{t.turkmenistan}</Link>
              </li>
              <li>
                <Link to="/Caucasus-Private-Tours">{t.caucasus}</Link>
              </li>
              <li>
                <Link to="/Armenia-Private-Tours">{t.armenia}</Link>
              </li>
              <li>
                <Link to="/Azerbaijan-Private-Tours">{t.azerbaijan}</Link>
              </li>
              <li>
                <Link to="/Georgia-Private-Tours">{t.georgia}</Link>
              </li>
              <li>
                <Link to="/Tailor-Private-Tours">{t.tailor}</Link>
              </li>
            </ul>
          </li>

          {/* Services */}
          <li className={`${styles.dropdown} ${styles.service}`}>
            {t.services} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>
                <Link to="/Asian-Tour-Transfer">{t.transfer}</Link>
              </li>
              <li>{t.hotelbooking}</li>
              <li>{t.guideservice}</li>
            </ul>
          </li>
        </ul>

        {/* Search box */}
        <div className={styles.searchBox}>
          <div
            className={styles.searchInput}
            onClick={() => setOpenFilter(!openFilter)}
          >
            <input type="text" placeholder={t.searchPlaceholder} readOnly />
            <button>▼</button>
          </div>

          {openFilter && (
            <div className={styles.filterPanel}>
              <div className={styles.filterSection}>
                <h4>{t.destinationsFilter}</h4>
                <div className={styles.grid}>
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
                              selectedDestinations.filter((item) => item !== d)
                            );
                          }
                        }}
                      />{" "}
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h4>{t.departure}</h4>
                <select
                  className={styles.selectBox}
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

              <div className={styles.filterSection}>
                <h4>{t.tourType}</h4>
                <label>
                  <input
                    type="radio"
                    name="tourType"
                    value="Group"
                    onChange={() => setTourType("Group")}
                  />{" "}
                  {t.group}
                </label>
                <label>
                  <input
                    type="radio"
                    name="tourType"
                    value="Private"
                    onChange={() => setTourType("Private")}
                  />{" "}
                  {t.private}
                </label>
              </div>

              <button className={styles.searchBtn} onClick={handleSearch}>
                {t.searchBtn}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
