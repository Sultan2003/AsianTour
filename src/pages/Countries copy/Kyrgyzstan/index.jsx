import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Kyrgyzstan.module.scss";
import mainImg from "../../../assets/Countries/kyrgyzstan.jpg";

export default function KyrgyzstanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "kyrgyzstan", name: "Kyrgyzstan" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Kyrgyzstan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Bishkek",
    "Osh",
    "Karakol",
    "Tokmok",
    "Cholpon-Ata",
    "Naryn",
    "Talas",
    "Batken",
    "Osh Bazaar",
    "Burana Tower",
    "Song-Kul Lake",
    "Issyk-Kul Lake",
    "Ala-Archa Gorge",
    "Arslanbob",
    "Sary-Chelek",
    "Tash-Rabat Caravanserai",
    "Sulaiman-Too Sacred Mountain",
    "Kel-Suu Lake",
  ];

  const notes = [
    "Travel safety matters",
    "Visa and registration matters",
    "Best time to visit",
    "Language",
    "Cuisine",
    "Clothing and weather",
    "Customs regulations",
    "Payment issues",
    "Mobile phone and Internet",
    "How to get around (local transport)",
  ];

  const noteTexts = [
    {
      id: "note1",
      title: notes[0],
      text: `Kyrgyzstan is considered one of the safest countries in Central Asia. Cities like Bishkek and Osh have visible police presence, especially in public areas and tourist attractions. The crime rate is low, and local people are known for their hospitality and openness towards guests. Travelers often feel safe while exploring cities or trekking in the mountains.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Kyrgyzstan has a simplified visa regime. Citizens of many countries, including the EU, USA, UK, Canada, Japan, and more, can visit visa-free for up to 60 days. For other nationalities, an e-visa option is available, which can be obtained online within a few days. Hotels usually handle registration automatically for foreign guests.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `The best time to visit Kyrgyzstan is from late spring to early autumn (May–September), when the weather is warm and suitable for outdoor adventures in the mountains and lakes. Winter months are cold and snowy, offering opportunities for skiing but making rural travel more difficult.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official language is Kyrgyz, but Russian is widely spoken, especially in cities. English is not as common, but in tourist areas and among younger people, you can often find English speakers.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Kyrgyz cuisine is influenced by nomadic traditions. Popular dishes include *beshbarmak* (noodles with meat), *manty* (steamed dumplings), *lagman* (hand-pulled noodles), and *plov*. Kumis (fermented mare’s milk) is a traditional drink. Local food is hearty and reflects the mountainous lifestyle.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `In summer, light clothing is recommended, especially for trekking. Comfortable shoes, hats, and sunscreen are essential. In mountain regions, temperatures can drop quickly, so warm layers are a must. In winter, heavy clothing and proper boots are necessary for snowy conditions.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs rules are simple. Cash under 10,000 USD does not need to be declared. Visitors carrying medicine should check local rules, but in general, there are no strict limitations. Souvenirs, carpets, and handicrafts can be taken out freely unless they are marked as cultural heritage.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Credit cards are accepted in Bishkek and larger cities, especially in hotels, supermarkets, and restaurants. However, cash is essential for rural areas, bazaars, and small shops. ATMs are available in cities, dispensing both Kyrgyz soms and foreign currencies.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `SIM cards are inexpensive and can be bought at the airport or city kiosks with a passport. Popular operators include Beeline, O!, and Megacom. Internet coverage is reliable in cities but weaker in remote mountain regions. Hotels and cafes often provide free Wi-Fi.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Public transportation in cities includes minibuses (*marshrutkas*), buses, and taxis. For intercity travel, shared taxis and minibuses are common. Popular tourist routes can also be reached by private tours. Traveling to mountain destinations often requires hiring a jeep or local guide.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Kyrgyzstan" />
            </div>

            {/* ✅ Visit Kyrgyzstan Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Kyrgyzstan</h2>
              <p>
                Kyrgyzstan, the land of towering mountains and nomadic culture,
                offers breathtaking landscapes and unforgettable traditions.
                Known as the "Switzerland of Central Asia," it is home to the
                stunning Issyk-Kul Lake, high alpine pastures, and Silk Road
                heritage sites. With its warm hospitality, Kyrgyzstan is a
                perfect destination for adventurers and cultural travelers
                alike.
              </p>
            </section>

            {/* ✅ Tours Section with Cards */}
            <h2>Upcoming Group Departures</h2>
            <div className={styles.cardsHeader}>
              <div>Date</div>
              <div></div>
              <div>Status</div>
              <div>Days</div>
              <div>Price</div>
            </div>

            {tours.map((tour) => {
              const statusText = tour.status1 ? "Available" : "Unavailable";
              return (
                <div
                  key={tour.id}
                  className={styles.tourCard}
                  onClick={() => navigate(`/tour/${tour.documentId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.dateBox}>
                    {new Date(tour.startDate).toLocaleDateString()}
                  </div>
                  <div className={styles.tourInfo}>
                    <a href="#" className={styles.title}>
                      {tour.title}
                    </a>
                    <p className={styles.cities}>{tour.location}</p>
                    <a href="#" className={styles.departures}>
                      {tour.availableSeats} seats available
                    </a>
                  </div>
                  <div
                    className={
                      tour.status1 ? styles.available : styles.unavailable
                    }
                  >
                    {statusText}
                  </div>
                  <div>
                    {Math.ceil(
                      (new Date(tour.endDate) - new Date(tour.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </div>
                  <div>${tour.price}</div>
                </div>
              );
            })}

            {/* ✅ Notes Section */}
            <section id="notes" className={styles.notesSection}>
              <h3>Notes about Kyrgyzstan</h3>
              <table>
                <tbody>
                  {[0, 1, 2, 3, 4].map((row) => (
                    <tr key={row}>
                      <td>
                        <a href={`#note${row + 1}`}>
                          {row + 1}. {notes[row]}
                        </a>
                      </td>
                      <td>
                        <a href={`#note${row + 6}`}>
                          {row + 6}. {notes[row + 5]}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {noteTexts.map((note) => (
              <section key={note.id} id={note.id} className={styles.noteDetail}>
                <h4>{note.title}</h4>
                <p>{note.text}</p>
                <a href="#notes" className={styles.backToNotes}>
                  ↑ Back to Notes
                </a>
              </section>
            ))}

            {/* ✅ Weather Section */}
            <div className={styles.weatherSection}>
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  to={`/weather/${c.slug}`}
                  className={styles.weatherLink}
                >
                  {c.name} Weather
                </Link>
              ))}
            </div>
          </div>

          {/* ✅ Sidebar with Destinations */}
          <div className={styles.sidebar}>
            <h3>Travel Destinations</h3>
            <ul>
              {destinations.map((d, i) => (
                <li key={i}>
                  <a href="#">{d}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
