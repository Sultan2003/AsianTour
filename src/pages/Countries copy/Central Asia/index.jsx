import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./centralasia.module.scss";
import mainImg from "../../../assets/Cities/Bukhara/Kalyan Minaret and Mosque 1.jpg";

export default function CentralAsiaToursDestinations() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "centralasia", name: "Central Asia" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Central Asia`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinationsByCountry = {
    Uzbekistan: ["Tashkent", "Samarkand", "Bukhara", "Khiva"],
    Kazakhstan: ["Almaty", "Astana"],
    Kyrgyzstan: ["Bishkek", "Osh"],
    Tajikistan: ["Dushanbe"],
    Turkmenistan: ["Ashgabat"],
  };

  const notes = [
    "Travel safety matters",
    "Visa and registration matters",
    "Best time to visit",
    "Languages across the region",
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
      text: `Central Asia is considered safe for travelers. Uzbekistan ranks high on safety indexes, Kyrgyzstan and Kazakhstan are welcoming with low violent crime, and Tajikistan and Turkmenistan are stable in tourist regions. Tourist police and local hospitality make visitors feel secure.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Visa policies differ: Uzbekistan and Kazakhstan allow many nationalities visa-free. Kyrgyzstan has simplified regimes. Tajikistan and Turkmenistan require visas, with Turkmenistan being the most restrictive. Registration rules apply in some countries, but hotels often assist.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `Best times to visit are spring (April–June) and autumn (September–October). Summers can exceed 40°C in deserts, while winters are cold, especially in mountains. Alpine lakes like Issyk-Kul or Pamir Highway are best explored in summer.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `Uzbek and Kazakh are Turkic languages, Russian is widely spoken across all five states. Tajik is Persian-based and spoken in Tajikistan. English is increasingly used in tourist hubs.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Food culture is rich: Uzbek plov, Kyrgyz beshbarmak, Kazakh horsemeat dishes, Tajik soups, and Turkmen kebabs. Fresh breads, tea, and shared meals are part of daily life.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Pack comfortable walking shoes and modest clothing for mosques or religious sites. Summers require light wear, hats, and sunscreen. Winters need warm coats, especially in mountains.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs are straightforward: under 10,000 USD in cash doesn’t need declaration. Medicines should be documented. Respect cultural traditions, especially around Islamic sites.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Visa/MasterCard work in big cities of Uzbekistan, Kazakhstan, Kyrgyzstan. Tajikistan and Turkmenistan are more cash-based. Always carry some local currency for small shops or bazaars.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `SIM cards are easy to purchase at airports or city kiosks. Wi-Fi is common in hotels and cafés in big cities, though rural areas may have limited coverage.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `High-speed trains connect Tashkent–Samarkand–Bukhara. Shared taxis and marshrutkas operate everywhere. Kyrgyzstan and Tajikistan are best explored by jeep or local drivers on mountain roads.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Central Asia" />
            </div>

            {/* ✅ Visit Central Asia Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Central Asia</h2>
              <p>
                Central Asia, the historic crossroads of civilizations, offers a
                rare opportunity to travel the heart of the Silk Road. From
                Uzbekistan’s ancient cities of Samarkand and Bukhara, to
                Kazakhstan’s wide steppes, Kyrgyzstan’s alpine lakes,
                Tajikistan’s Pamir Highway, and Turkmenistan’s desert marvels,
                the region embodies centuries of culture, hospitality, and
                breathtaking landscapes. Traditions remain alive in bustling
                bazaars, vibrant festivals, and daily life, making Central Asia
                a timeless journey for modern explorers.
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
              <h3>Notes about Central Asia</h3>
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

            {Object.entries(destinationsByCountry).map(([country, cities]) => (
              <div key={country} className={styles.countryBlock}>
                <ul>
                  {cities.map((city, i) => (
                    <li key={i}>
                      <Link
                        to={`/${country}-${city}`}
                        className={styles.sidebarLink}
                      >
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
