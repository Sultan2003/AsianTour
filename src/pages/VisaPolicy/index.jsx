import styles from "./VisaPolicy.module.scss";
import mainImg from "../../assets/Countries/uzb-registan.jpg";

export default function VisaPolicy() {
  return (
    <div className={styles.visaPage}>
      {/* ===== HERO SECTION ===== */}
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${mainImg})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroText}>
          <h1>Uzbekistan Visa Policy</h1>
          <p>
            Discover Uzbekistan’s welcoming visa policy designed to make your
            visit easy, efficient, and traveler-friendly.
          </p>
        </div>
      </div>

      {/* ===== CONTENT GRID ===== */}
      <div className={styles.contentGrid}>
        {/* LEFT SIDE */}
        <div className={styles.visaInfo}>
          {/* 1️⃣ Unlimited Visa-Free Entry */}
          <section className={styles.card}>
            <h2>1. Unlimited Visa-Free Entry</h2>
            <p>
              Citizens of the following countries may enter and stay in
              Uzbekistan without any time restriction:
            </p>
            <div className={styles.tableWrapper}>
              <table>
                <tbody>
                  <tr>
                    <td>Azerbaijan</td>
                    <td>Georgia</td>
                    <td>Armenia</td>
                    <td>Belarus</td>
                  </tr>
                  <tr>
                    <td>Kazakhstan</td>
                    <td>Moldova</td>
                    <td>Russia</td>
                    <td>Ukraine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 2️⃣ 60 Days Visa-Free */}
          <section className={styles.card}>
            <h2>2. 60 Days Visa-Free</h2>
            <p>
              Citizens of <strong>Kyrgyzstan 🇰🇬</strong> may visit and stay in
              Uzbekistan for up to <strong>60 days</strong> without a visa.
            </p>
          </section>

          {/* 3️⃣ 30 Days Visa-Free */}
          <section className={styles.card}>
            <h2>3. 30 Days Visa-Free</h2>
            <p>
              Citizens from more than 70 countries can enter Uzbekistan without
              a visa for up to 30 days. The list includes:
            </p>
            <div className={styles.countryGrid}>
              {[
                "Andorra",
                "Argentina",
                "Australia",
                "Austria",
                "Bahrain",
                "Belgium",
                "Brazil",
                "Bulgaria",
                "Canada",
                "China",
                "Croatia",
                "Cyprus",
                "Czech Republic",
                "Denmark",
                "Finland",
                "France",
                "Germany",
                "Greece",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Ireland",
                "Israel",
                "Italy",
                "Japan",
                "Korea (Republic of)",
                "Kuwait",
                "Latvia",
                "Lithuania",
                "Luxembourg",
                "Malaysia",
                "Malta",
                "Mexico",
                "Monaco",
                "Mongolia",
                "Netherlands",
                "New Zealand",
                "Norway",
                "Oman",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Saudi Arabia",
                "Serbia",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "Spain",
                "Sweden",
                "Switzerland",
                "Tajikistan",
                "Turkey",
                "United Kingdom",
                "United States",
                "United Arab Emirates",
                "Vatican City",
              ].map((country, i) => (
                <li key={i}>{country}</li>
              ))}
            </div>
            <p>
              <strong>Note:</strong> Citizens of <b>Bahrain</b>, <b>Qatar</b>,{" "}
              <b>Kuwait</b>, <b>Oman</b>, and <b>China</b> may enjoy{" "}
              <b>10 days visa-free</b> if they hold a confirmed air ticket to a
              third country.
            </p>
          </section>

          {/* 4️⃣ e-Visa */}
          <section className={styles.card}>
            <h2>4. Simplified Electronic Visa (e-Visa)</h2>
            <p>
              Citizens of 57 countries may apply online for an electronic visa
              via{" "}
              <a
                href="https://www.e-visa.gov.uz"
                target="_blank"
                rel="noreferrer"
              >
                www.e-visa.gov.uz
              </a>
              .
            </p>
            <ul>
              <li>Stay up to 30 days</li>
              <li>Single, double, or multiple entry</li>
              <li>Valid for 90 days from issuance</li>
              <li>Processing time: 2 working days</li>
            </ul>

            <div className={styles.tableWrapper}>
              <h4>Fees for 30-Day Electronic Visa</h4>
              <table>
                <thead>
                  <tr>
                    <th>Visa Type</th>
                    <th>Fee (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Single-entry</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Double-entry</td>
                    <td>35</td>
                  </tr>
                  <tr>
                    <td>Multiple-entry</td>
                    <td>50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Applications should be made at least 3 working days prior to
              travel. Fees are non-refundable.
            </p>
          </section>

          {/* 5️⃣ Embassy Application */}
          <section className={styles.card}>
            <h2>5. Applying for a Visa Through an Embassy</h2>
            <ol>
              <li>
                Obtain <b>Visa Support</b> from the Ministry of Foreign Affairs.
              </li>
              <li>
                Apply at a <b>Uzbekistan Embassy</b>, <b>Consulate</b>, or in
                some cases, at the airport.
              </li>
            </ol>
          </section>

          {/* 6️⃣ Visa Support (LOI) */}
          <section className={styles.card}>
            <h2>6. Visa Support / Letter of Invitation (LOI)</h2>
            <p>
              Travelers not eligible for visa-free or e-Visa entry must obtain
              an LOI, arranged through a licensed travel agency. The Ministry of
              Foreign Affairs processes applications within 7 working days.
            </p>
            <p>
              After approval, a <b>telex number</b> is issued to be used during
              visa application. The Ministry reserves the right to refuse
              without explanation.
            </p>
          </section>

          {/* 7️⃣ Transit Visa */}
          <section className={styles.card}>
            <h2>7. Transit Visa</h2>
            <p>
              Allows a stay of up to 72 hours for travelers passing through
              Uzbekistan.
            </p>
            <ul>
              <li>Apply online at evisa.mfa.uz</li>
              <li>Provide passport, photo, and confirmed tickets</li>
              <li>Show entry visa for destination country</li>
              <li>Processing: 3–5 working days</li>
            </ul>
          </section>

          {/* 8️⃣ Under 16 */}
          <section className={styles.card}>
            <h2>8. Visa for Applicants Under 16</h2>
            <p>
              Children under 16 may enter Uzbekistan visa-free if accompanied by
              guardians with valid visas. Their stay must not exceed 90 days or
              the guardian’s visa validity.
            </p>
          </section>

          {/* 9️⃣ Registration */}
          <section className={styles.card}>
            <h2>9. Registration in Uzbekistan</h2>
            <p>
              All visitors must register within 3 days after arrival. Hotels and
              hostels automatically register guests, while private travelers can
              register online at{" "}
              <a href="https://emehmon.uz" target="_blank" rel="noreferrer">
                emehmon.uz
              </a>
              .
            </p>
          </section>

          {/* ✅ Before You Travel */}
          <section className={styles.card}>
            <h2>Before You Travel</h2>
            <ul className={styles.checkList}>
              <li>Passport valid for at least 6 months</li>
              <li>Confirm your accommodation</li>
              <li>Keep your registration slip safe</li>
            </ul>
          </section>

          {/* ✅ Closing */}
          <section className={styles.card}>
            <h2>Uzbekistan Awaits You 🇺🇿</h2>
            <p>
              Historic cities, warm hospitality, and a simple visa process —
              your journey begins here!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
