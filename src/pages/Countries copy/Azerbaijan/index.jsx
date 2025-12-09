import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Azerbaijan.module.scss";
import mainImg from "../../../assets/Countries/azerbaijan.jpg";

export default function AzerbaijanToursDestination() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "azerbaijan", name: "Azerbaijan" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Azerbaijan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = ["Baku"];

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
      text: `Azerbaijan is considered a safe country for travelers. 
      Tourist areas in Baku and other major cities are secure, with police presence and CCTV. 
      Petty crimes are rare, though travelers should stay alert in crowded areas. 
      Locals are welcoming and known for their hospitality toward guests.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Many nationalities can obtain an e-visa online within a few days. 
      The visa allows stays of up to 30 days. A valid passport with at least 6 months remaining is required. 
      Hotels will handle registration if staying more than 10 days. 
      Border areas may require additional permits.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `The best time to visit Azerbaijan is spring (April–June) and autumn (September–October). 
      Summers in Baku can be hot and humid, while mountain regions remain cooler. 
      Winters can be mild in Baku but snowy in the Caucasus, making it great for skiing in resorts like Shahdag.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official language is Azerbaijani (Azeri), a Turkic language. 
      Russian is widely understood, and English is increasingly spoken in Baku and tourist areas. 
      Learning a few Azeri phrases will be appreciated by locals.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Azerbaijani cuisine blends Middle Eastern and Caucasian influences. 
      Famous dishes include plov (pilaf), kebabs, dolma, piti (lamb stew), and qutab (stuffed flatbread). 
      Tea is central to Azerbaijani culture, often served with jam or sweets. 
      Don’t miss tasting local pomegranate products and Caspian sturgeon caviar.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Light, comfortable clothing is ideal for Baku in summer, while warmer layers are needed in the mountains. 
      Modest attire is appreciated when visiting mosques or rural areas. 
      Winters require coats and boots, especially if traveling outside the capital.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs regulations are simple. 
      Visitors may bring personal items without restriction and up to 10,000 USD in cash without declaration. 
      Alcohol and tobacco have limits for import. 
      Export of antiques, carpets, and cultural items requires special permits.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Credit cards are widely accepted in Baku, but cash (Azerbaijani Manat, AZN) is preferred in rural areas. 
      ATMs are available in most towns. 
      Currency exchange is straightforward, and rates are generally stable.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `SIM cards are affordable and can be purchased at the airport or in the city. 
      Operators like Azercell, Bakcell, and Nar provide good coverage. 
      Wi-Fi is widely available in hotels and cafes. 
      Mobile internet is reliable, even outside of Baku.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Public transport in Baku includes buses, a modern metro system, and taxis. 
      Taxi apps like Bolt are widely used and affordable. 
      For intercity travel, buses and trains connect major towns. 
      Renting a car is an option for exploring mountain and rural areas.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Azerbaijan" />
            </div>

            {/* ✅ Visit Azerbaijan Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Azerbaijan</h2>
              <p>
                Azerbaijan, the “Land of Fire,” is a fascinating mix of East and
                West. From the modern skyline of Baku with its iconic Flame
                Towers to the ancient petroglyphs of Gobustan and the timeless
                Silk Road cities, Azerbaijan offers both cultural richness and
                natural wonders. Visitors can explore the Caspian Sea coast,
                hike in the Caucasus Mountains, and discover unique traditions
                shaped by history and geography.
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
              <h3>Notes about Azerbaijan</h3>
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
                  <Link to={`/Azerbaijan-${d}`} className={styles.sidebarLink}>
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
