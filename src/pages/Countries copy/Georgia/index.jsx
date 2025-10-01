// GeorgiaToursDestination.jsx

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Georgia.module.scss";
import mainImg from "../../../assets/Countries/georgia.jpg";

export default function GeorgiaToursDestination() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "georgia", name: "Georgia" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Georgia`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Tbilisi",
    "Mtskheta",
    "Kazbegi (Stepantsminda)",
    "Batumi",
    "Kutaisi",
    "Telavi (Kakheti wine region)",
    "Svaneti (Mestia, Ushguli)",
    "Borjomi",
    "Vardzia Cave Monastery",
    "Gudauri Ski Resort",
    "Signagi",
    "David Gareja Monastery",
    "Uplistsikhe",
    "Gelati Monastery",
    "Martvili Canyon",
    "Okatse Canyon",
    "Racha",
    "Poti",
    "Anaklia",
    "Tskaltubo",
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
      text: `Georgia is a safe country for travelers. Major tourist areas in Tbilisi, Batumi, and other cities are secure and welcoming. 
      Petty theft is rare but caution is advised in crowded places. Georgians are known for their hospitality, often treating guests like family.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Many travelers from Europe, the US, and neighboring countries can enter Georgia visa-free for up to 1 year. 
      For others, e-visas are available online. No special registration is needed for most short-term stays.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `The best time to visit Georgia is spring (April–June) and autumn (September–October), when the weather is mild and landscapes are stunning. 
      Summer is ideal for hiking in the Caucasus, while winter attracts skiers to resorts like Gudauri and Bakuriani.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official language is Georgian, which uses its unique alphabet. Russian is widely understood, especially among older generations, 
      while English is increasingly spoken in Tbilisi and tourist areas. Learning a few Georgian phrases is highly appreciated.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Georgian cuisine is famous worldwide for its rich flavors. Must-try dishes include khachapuri (cheese bread), khinkali (dumplings), 
      mtsvadi (grilled meat), pkhali (vegetable pâtés), and churchkhela (sweet grape and nut snack). Georgia is also the birthplace of wine, 
      with Kakheti being the heart of winemaking.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Light clothing is suitable for summer, but a jacket is recommended for mountain areas where evenings are cool. 
      In winter, warm coats, gloves, and boots are necessary, especially in ski regions. Modest attire is appreciated when visiting monasteries and churches.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Travelers can bring personal items freely. Cash over 30,000 GEL (around 10,000 USD) must be declared. 
      Export of cultural treasures, antiques, and religious artifacts requires permits.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Credit cards are accepted in most hotels, restaurants, and shops in cities. However, cash (Georgian Lari, GEL) is needed in rural areas. 
      ATMs are widely available. Currency exchange offices are common and offer good rates.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `Local SIM cards are inexpensive and available at the airport or in cities. Main operators include Magti, Beeline, and Silknet. 
      Mobile internet is fast and reliable across much of the country. Free Wi-Fi is common in cafes and hotels.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Public transport in Georgia includes minibuses (marshrutkas), buses, and trains. Tbilisi has a metro system that is cheap and efficient. 
      Taxis and ride-hailing apps like Bolt are widely used. For mountain and rural areas, renting a car is recommended.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Georgia" />
            </div>

            {/* ✅ Visit Georgia Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Georgia</h2>
              <p>
                Georgia, nestled in the heart of the Caucasus, is a country of
                breathtaking landscapes, ancient traditions, and vibrant
                culture. From the cobblestone streets of Tbilisi to the snowy
                peaks of Kazbegi and the vineyards of Kakheti, Georgia offers a
                diverse range of experiences. Known for its legendary
                hospitality, world-class wine, and delicious cuisine, Georgia is
                truly a hidden gem waiting to be discovered.
              </p>
            </section>

            {/* ✅ Tours Section */}
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
              <h3>Notes about Georgia</h3>
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

          {/* ✅ Sidebar */}
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
