import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa";
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
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();

  const { lang } = useContext(LanguageContext);
  const t = footerTranslations[lang] || footerTranslations.en;

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              <Link to="/Asian-Tour-Transfer">Transfer</Link>
            </li>
            <li>
              <Link to="/Asian-Tour-Hotel-Booking">Hotel Booking</Link>
            </li>
            <li>
              <Link to="/Asian-Tour-Hotel-Guide-Service">Guide Service</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className={styles.column}>
          <h3 className={styles.heading}>{t.company}</h3>
          <ul>
            <li onClick={() => navigate("/contact")}>{t.aboutUs}</li>
            <li>
              <Link to="/testimonials">{t.testimonials}</Link>
            </li>
            <li>
              <Link to="/team">{t.ourTeam}</Link>
            </li>
            <li>
              <Link to="/careers">{t.careers}</Link>
            </li>
            <li>
              <Link to="/booking-terms">{t.bookingTerms}</Link>
            </li>
            <li>
              <Link to="/cancellations">{t.cancellations}</Link>
            </li>
            <li>
              <Link to="/privacy-policy">{t.privacyPolicy}</Link>
            </li>
            <li>
              <Link to="/sustainability-policy">{t.sustainabilityPolicy}</Link>
            </li>
            <li>
              <Link to="/partnership">{t.partnership}</Link>
            </li>
            <li>
              <Link to="/contacts">{t.contacts}</Link>
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
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FacebookIcon /> <br></br>
              <p style={{ fontSize: "14px" }}>Instagram</p>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <InstagramIcon /> <br></br>
              <p style={{ fontSize: "14px" }}>Instagram</p>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <YoutubeIcon /> <br></br>
              <p style={{ fontSize: "14px" }}>Youtube</p>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
