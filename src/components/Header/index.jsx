import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.topLinks}>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
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
        <img
          src="https://www.advantour.com/img/logo.png"
          alt="Logo"
          className={styles.logo}
        />
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
          <li>DESTINATIONS</li>
          <li>PRIVATE TOURS</li>
          <li>GROUP PACKAGES</li>
          <li>TESTIMONIALS</li>
          <li>PUBLICATIONS</li>
        </ul>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search for group and private tours" />
          <button>▼</button>
        </div>
      </nav>
    </header>
  );
}
