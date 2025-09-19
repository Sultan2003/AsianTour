import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext"
import headerTranslations from "../../translations/header";


export default function Header() {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();
  const { lang, setLang } = useContext(LanguageContext);
  const t = headerTranslations[lang];

  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topLinks}>
          <a href="#">{t.about}</a>
          <a onClick={() => navigate("/contact")}>{t.contact}</a>
        </div>
        <div className={styles.languages}>
          <a onClick={() => setLang("en")}>ENG</a>
          <a onClick={() => setLang("ru")}>РУС</a>
        </div>
      </div>

      {/* Logo + banner */}
      <div className={styles.logoBanner}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.banner}>
          <span className={styles.badge}>{t.bestSeller}</span>
          <span className={styles.title}>{t.centralAsia}</span>
          <span className={styles.subtitle}>{t.groupTour}</span>
          <span className={styles.price}>{t.fromPrice}</span>
        </div>
      </div>

      {/* Nav bar */}
      <nav className={styles.navBar}>
        <ul className={styles.navLinks}>
          <li className={styles.dropdown}>
            {t.destinations} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>Kazakhstan</li>
              <li>Kyrgyzstan</li>
              <li>Tajikistan</li>
              <li>Turkmenistan</li>
              <li onClick={() => navigate("/Uzbek-Tours")}>Uzbekistan</li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            {t.privateTours} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>{t.cityTours}</li>
              <li>{t.culturalTours}</li>
              <li>{t.adventureTours}</li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            {t.groupPackages} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li>{t.summer}</li>
              <li>{t.winter}</li>
              <li>{t.customGroups}</li>
            </ul>
          </li>
        </ul>

        {/* Search box */}
        <div className={styles.searchBox}>
          <div
            className={styles.searchInput}
            onClick={() => setOpenFilter(!openFilter)}
          >
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              readOnly
            />
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
                      <input type="checkbox" /> {d}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.filterSection}>
                <h4>{t.departure}</h4>
                <select className={styles.selectBox}>
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
                  <input type="radio" name="tourType" /> {t.group}
                </label>
                <label>
                  <input type="radio" name="tourType" /> {t.private}
                </label>
              </div>

              <button className={styles.searchBtn}>{t.searchBtn}</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
