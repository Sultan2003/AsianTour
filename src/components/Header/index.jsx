import { Link , useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useState } from "react";


export default function Header() {
   const [openFilter, setOpenFilter] = useState(false);
   const navigate = useNavigate(); 
  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topLinks}>
          <a href="#">About Us</a>
          <a onClick={() => navigate('/contact')} >Contact Us</a>
        </div>
        <div className={styles.languages}>
          <a href="#">ENG</a>
          <a href="#">РУС</a>
          <a href="#">DEU</a>
          <a href="#">FRA</a>
          <a href="#">ESP</a>
          <a href="#">ITA</a>
          <a href="#">日本語</a>
        </div>
      </div>

      {/* Logo + banner */}
      <div className={styles.logoBanner}>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className={styles.logo}
          />
        </Link>
        <div className={styles.banner}>
          <span className={styles.badge}>Best seller</span>
          <span className={styles.title}>CENTRAL ASIA</span>
          <span className={styles.subtitle}>Group Tour 2025-2027</span>
          <span className={styles.price}>from US$ 3,940</span>
        </div>
      </div>

      {/* Nav bar */}
      <nav className={styles.navBar}>
  <ul className={styles.navLinks}>
    <li className={styles.dropdown}>
      DESTINATIONS <span className={styles.arrow}>▼</span>
      <ul className={styles.dropdownMenu}>
        
  <li>Kazakhstan</li>
  <li>Kyrgyzstan</li>
  <li>Tajikistan</li>
  <li>Turkmenistan</li>
  <li onClick={() => navigate('/Uzbek-Tours')}>Uzbekistan</li>


      </ul>
    </li>
    <li className={styles.dropdown}>
      PRIVATE TOURS <span className={styles.arrow}>▼</span>
      <ul className={styles.dropdownMenu}>
        <li>City Tours</li>
        <li>Cultural Tours</li>
        <li>Adventure Tours</li>
      </ul>
    </li>
    <li className={styles.dropdown}>
      GROUP PACKAGES <span className={styles.arrow}>▼</span>
      <ul className={styles.dropdownMenu}>
        <li>Summer 2025</li>
        <li>Winter 2025</li>
        <li>Custom Groups</li>
      </ul>
    </li>
  </ul>
  <div className={styles.searchBox}>
  <div className={styles.searchInput} onClick={() => setOpenFilter(!openFilter)}>
    <input type="text" placeholder="Search for group and private tours" readOnly />
    <button>▼</button>
  </div>

  {openFilter && (
  <div className={styles.filterPanel}>
    {/* Destination filter (Central Asia only) */}
    <div className={styles.filterSection}>
      <h4>Central Asia Destinations</h4>
      <div className={styles.grid}>
        {["Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Uzbekistan"].map((d) => (
          <label key={d}>
            <input type="checkbox" /> {d}
          </label>
        ))}
      </div>
    </div>

    {/* Departure filter */}
    <div className={styles.filterSection}>
      <h4>Departure Dates</h4>
      <select className={styles.selectBox}>
        <option value="">Any Month</option>
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>

    {/* Tour type filter */}
    <div className={styles.filterSection}>
      <h4>Tour Type</h4>
      <label><input type="radio" name="tourType" /> Group</label>
      <label><input type="radio" name="tourType" /> Private</label>
    </div>

    <button className={styles.searchBtn}>Search Tours</button>
  </div>
)}

</div>

</nav>

    </header>
  );
}
