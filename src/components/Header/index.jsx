import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/background/Logo 2.png";
import AnimatedLogo from "../../../public/assets/animatedlogo/logo";

export default function Header2({ onLoginClick }) {
  const navigate = useNavigate();

  const [compact, setCompact] = useState(false);

  // ✅ SEARCH LOGIC FROM HEADER1
  const [openFilter, setOpenFilter] = useState(false);
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

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          <div className={styles.searchWrapper}>
            <div
              className={styles.searchBox}
              onClick={() => setOpenFilter(!openFilter)}
            >
              <input type="text" placeholder="Search tours..." readOnly />
              <button className={styles.searchBtn}>▼</button>
            </div>

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
            {/* ❌ LANGUAGE SWITCH REMOVED */}
            <NavLink className={styles.navlink} to="/about">
              About Us
            </NavLink>

            <NavLink className={styles.navlink} to="/contact">
              Contact
            </NavLink>
          </div>
        </div>
      </div>

      {/* ✅ NAVIGATION FROM HEADER1 */}
      <nav className={styles.bottomRow}>
        <div className={styles.menuItem}>
          <span>Destinations ▾</span>
          <div className={styles.dropdown}>
            <div className={styles.dropdownGrid}>
              <Link to="/Silk-Road">Silk Road</Link>
              <Link to="/Central-Asia">Central Asia</Link>
              <Link to="/Uzbekistan">Uzbekistan</Link>
              <Link to="/Kazakhstan">Kazakhstan</Link>
              <Link to="/Kyrgyzstan">Kyrgyzstan</Link>
              <Link to="/Tajikistan">Tajikistan</Link>
              <Link to="/Turkmenistan">Turkmenistan</Link>
              <Link to="/Caucasus">Caucasus</Link>
              <Link to="/Armenia">Armenia</Link>
              <Link to="/Azerbaijan">Azerbaijan</Link>
              <Link to="/Georgia">Georgia</Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span>Group Tours ▾</span>
          <div className={styles.dropdown}>
            <div className={styles.dropdownGrid}>
              <Link to="/Silk-Road-Tours">Silk Road</Link>
              <Link to="/Central-Asia-Tours">Central Asia</Link>
              <Link to="/Uzbek-Tours">Uzbekistan</Link>
              <Link to="/Kazakh-Tours">Kazakhstan</Link>
              <Link to="/Kyrgyz-Tours">Kyrgyzstan</Link>
              <Link to="/Tajik-Tours">Tajikistan</Link>
              <Link to="/Turkmen-Tours">Turkmenistan</Link>
              <Link to="/Caucas-Tours">Caucasus</Link>
              <Link to="/Armenia-Tours">Armenia</Link>
              <Link to="/Azerbaijan-Tours">Azerbaijan</Link>
              <Link to="/Georgia-Tours">Georgia</Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span>Private Tours ▾</span>
          <div className={styles.dropdown}>
            <div className={styles.dropdownGrid}>
              <Link to="/Silk-Road-Private-Tours">Silk Road</Link>
              <Link to="/Central-Asia-Private-Tours">Central Asia</Link>
              <Link to="/Uzbekistan-Private-Tours">Uzbekistan</Link>
              <Link to="/Kazakhstan-Private-Tours">Kazakhstan</Link>
              <Link to="/Kyrgyzstan-Private-Tours">Kyrgyzstan</Link>
              <Link to="/Tajikistan-Private-Tours">Tajikistan</Link>
              <Link to="/Turkmenistan-Private-Tours">Turkmenistan</Link>
              <Link to="/Caucasus-Private-Tours">Caucasus</Link>
              <Link to="/Armenia-Private-Tours">Armenia</Link>
              <Link to="/Azerbaijan-Private-Tours">Azerbaijan</Link>
              <Link to="/Georgia-Private-Tours">Georgia</Link>
              <Link to="/Tailor-Private-Tours">Tailor Made</Link>
            </div>
          </div>
        </div>

        <div className={styles.menuItem}>
          <span>Services ▾</span>
          <div className={styles.dropdown}>
            <div className={styles.dropdownGrid}>
              <Link to="/Asian-Tour-Transfer">Transfer</Link>
              <span>Hotel Booking</span>
              <span>Guide Service</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
