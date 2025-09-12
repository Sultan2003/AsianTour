import React, { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate(); 

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
          <h3 className={styles.heading}>Travel Destinations</h3>
          <ul>
            <li className={styles.subheading}>Silk Road</li>
            <li className={styles.subheading}>Central Asia</li>
            <li><Link to="/uzbekistan">Uzbekistan</Link></li>
            <li><Link to="/kazakhstan">Kazakhstan</Link></li>
            <li><Link to="/kyrgyzstan">Kyrgyzstan</Link></li>
            <li><Link to="/tajikistan">Tajikistan</Link></li>
            <li><Link to="/turkmenistan">Turkmenistan</Link></li>
            <li className={styles.subheading}>Caucasus</li>
            <li><Link to="/georgia">Georgia</Link></li>
            <li><Link to="/azerbaijan">Azerbaijan</Link></li>
            <li><Link to="/armenia">Armenia</Link></li>
            <li><Link to="/china">China</Link></li>
            <li><Link to="/japan">Japan</Link></li>
            <li><Link to="/russia">Russia</Link></li>
            <li><Link to="/turkey">Turkey</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Services</h3>
          <ul>
            <li><Link to="/small-group-tours">Small Group Tours</Link></li>
            <li><Link to="/private-tours">Private Tours</Link></li>
            <li><Link to="/custom-tours">Custom Tours</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className={styles.column}>
          <h3 className={styles.heading}>Company</h3>
          <ul>
            <li onClick={() => navigate('/contact')}>About Us</li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/careers">Career Opportunities</Link></li>
            <li><Link to="/booking-terms">Booking Terms</Link></li>
            <li><Link to="/cancellations">Cancellations</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/sustainability-policy">Sustainability Policy</Link></li>
            <li><Link to="/partnership">Partnership</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
          </ul>
        </div>

        {/* Payments + Social */}
        <div className={styles.column}>
          <div className={styles.payments}>
            <img src="/visa.png" alt="Visa" />
            <img src="/mastercard.png" alt="Mastercard" />
          </div>
          <p className={styles.copy}>
            Copyright © 2001 — 2025 Advantour <br /> All rights reserved
          </p>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
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
