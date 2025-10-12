import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/background/Logo 2.png";
import { useState, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
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
              <li onClick={() => navigate("/Silk-Road")}>{t.silkRoadd}</li>
              <li onClick={() => navigate("/Central-Asia")}>
                {t.centralAsiad}
              </li>
              <li onClick={() => navigate("/Uzbekistan")}>{t.uzbekistand}</li>
              <li onClick={() => navigate("/Kazakhstan")}>{t.kazakhstand}</li>
              <li onClick={() => navigate("/Kyrgyzstan")}>{t.kyrgyzstand}</li>
              <li onClick={() => navigate("/Tajikistan")}>{t.tajikistand}</li>
              <li onClick={() => navigate("/Turkmenistan")}>
                {t.turkmenistand}
              </li>
              <li onClick={() => navigate("/Caucasus")}>{t.caucasusd}</li>
              <li onClick={() => navigate("/Armenia")}>{t.armeniad}</li>
              <li onClick={() => navigate("/Azerbaijan")}>{t.azerbaijand}</li>
              <li onClick={() => navigate("/Georgia")}>{t.georgiad}</li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            {t.groupPackages} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li onClick={() => navigate("/Silk-Road-Tours")}>{t.silkRoad}</li>
              <li onClick={() => navigate("/Central-Asia-Tours")}>
                {t.centralAsia}
              </li>
              <li onClick={() => navigate("/Uzbek-Tours")}>{t.uzbekistan}</li>
              <li onClick={() => navigate("/Kazakh-Tours")}>{t.kazakhstan}</li>
              <li onClick={() => navigate("/Kyrgyz-Tours")}>{t.kyrgyzstan}</li>
              <li onClick={() => navigate("/Tajik-Tours")}>{t.tajikistan}</li>
              <li onClick={() => navigate("/Turkmen-Tours")}>
                {t.turkmenistan}
              </li>
              <li onClick={() => navigate("/Caucas-Tours")}>{t.caucasus}</li>
              <li onClick={() => navigate("/Armenia-Tours")}>{t.armenia}</li>
              <li onClick={() => navigate("/Azerbaijan-Tours")}>
                {t.azerbaijan}
              </li>
              <li onClick={() => navigate("/Georgia-Tours")}>{t.georgia}</li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            {t.privateTours} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li onClick={() => navigate("/Silk-Road-Private-Tours")}>
                {t.silkRoad}
              </li>
              <li onClick={() => navigate("/Central-Asia-Private-Tours")}>
                {t.centralAsia}
              </li>
              <li onClick={() => navigate("/Uzbekistan-Private-Tours")}>
                {t.uzbekistan}
              </li>
              <li onClick={() => navigate("/Kazakhstan-Private-Tours")}>
                {t.kazakhstan}
              </li>
              <li onClick={() => navigate("/Kyrgyzstan-Private-Tours")}>
                {t.kyrgyzstan}
              </li>
              <li onClick={() => navigate("/Tajikistan-Private-Tours")}>
                {t.tajikistan}
              </li>
              <li onClick={() => navigate("/Turkmenistan-Private-Tours")}>
                {t.turkmenistan}
              </li>
              <li onClick={() => navigate("/Caucasus-Private-Tours")}>
                {t.caucasus}
              </li>
              <li onClick={() => navigate("/Armenia-Private-Tours")}>
                {t.armenia}
              </li>
              <li onClick={() => navigate("/Azerbaijan-Private-Tours")}>
                {t.azerbaijan}
              </li>
              <li onClick={() => navigate("/Georgia-Private-Tours")}>
                {t.georgia}
              </li>
              <li onClick={() => navigate("/Tailor-Private-Tours")}>
                {t.tailor}
              </li>
            </ul>
          </li>
          <li className={styles.dropdown}>
            {t.services} <span className={styles.arrow}>▼</span>
            <ul className={styles.dropdownMenu}>
              <li onClick={() => navigate("/Asian-Tour-Transfer")}>
                {t.transfer}
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
