import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import { LanguageContext } from "../../context/LanguageContext";
import footerTranslations from "../../translations/footer";
import InstagramIcon, {
  FacebookIcon,
  MastercardIcon,
  VisaCardIcon,
  YoutubeIcon,
} from "../../assets/icons/icons";

const Footer = () => {
  const { lang } = useContext(LanguageContext);
  const t = footerTranslations[lang] || footerTranslations.en;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Travel Destinations */}
        <div className={styles.column}>
          <h3 className={styles.heading}>{t.travelDestinations}</h3>
          <ul>
            <li className={styles.subheading}>{t.silkRoad}</li>
            <li className={styles.subheading}>{t.centralAsia}</li>
            <li>
              <Link to="/uzbekistan">Uzbekistan</Link>
            </li>
            <li>
              <Link to="/kazakhstan">Kazakhstan</Link>
            </li>
            <li>
              <Link to="/kyrgyzstan">Kyrgyzstan</Link>
            </li>
            <li>
              <Link to="/tajikistan">Tajikistan</Link>
            </li>
            <li>
              <Link to="/turkmenistan">Turkmenistan</Link>
            </li>
            <li className={styles.subheading}>{t.caucasus}</li>
            <li>
              <Link to="/georgia">Georgia</Link>
            </li>
            <li>
              <Link to="/azerbaijan">Azerbaijan</Link>
            </li>
            <li>
              <Link to="/armenia">Armenia</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.column}>
          <h3 className={styles.heading}>{t.services}</h3>
          <ul>
            <li>
              <Link to="/transfer">Transfer</Link>
            </li>
            <li>
              <Link to="/hotels">Hotels</Link>
            </li>
            <li>
              <Link to="/contact">Guide Service</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className={styles.column}>
          <h3 className={styles.heading}>{t.company}</h3>
          <ul>
            <li>
              <Link to="/about">{t.aboutUs}</Link>
            </li>
            <li>
              <Link to="/booking-form">{t.bookingTerms}</Link>
            </li>
            <li>
              <Link to="/contact">{t.cancellations}</Link>
            </li>
            <li>
              <Link to="/contact">{t.privacyPolicy}</Link>
            </li>
            <li>
              <Link to="/contact">{t.contacts}</Link>
            </li>
          </ul>
        </div>

        {/* Payments + Social */}
        <div className={styles.column}>
          <div className={styles.payments}>
            <VisaCardIcon />
            <MastercardIcon />
          </div>
          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/profile.php?id=61572084062845#"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon />
              <p>Facebook</p>
            </a>
            <a
              href="https://www.instagram.com/gotocentralasia/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
              <p>Instagram</p>
            </a>
            <a
              href="https://www.youtube.com/@gotocentralasia"
              target="_blank"
              rel="noreferrer"
            >
              <YoutubeIcon />
              <p>Youtube</p>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
    </footer>
  );
};

export default Footer;
