import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import styles from "./Turkmenistan.module.scss";
import mainImg from "../../../assets/Countries/Turkmenistan.jpg";

export default function TurkmenistanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "turkmenistan", name: "Turkmenistan" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Turkmenistan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = ["Ashgabat"];

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
      text: "Turkmenistan is generally safe for travelers, but movement is often regulated. You may encounter frequent police checkpoints. Always carry your passport and required permits when traveling outside Ashgabat.",
    },
    {
      id: "note2",
      title: notes[1],
      text: "Most visitors need a visa to enter Turkmenistan. In addition, all foreign visitors must register with the State Migration Service within three days of arrival. Travel permits are required to visit regions such as Dashoguz or Mary.",
    },
    {
      id: "note3",
      title: notes[2],
      text: "The ideal time to visit Turkmenistan is spring (April–May) and autumn (September–October), when the weather is milder. Summers can be extremely hot, especially in the Karakum Desert.",
    },
    {
      id: "note4",
      title: notes[3],
      text: "The official language is Turkmen, but Russian is widely spoken in cities. English is less common, so having a phrasebook or guide can be helpful.",
    },
    {
      id: "note5",
      title: notes[4],
      text: "Traditional Turkmen cuisine features dishes such as plov (rice pilaf), shashlik (grilled meat), and chorek (flatbread). Meals are often hearty, and tea is a central part of hospitality.",
    },
    {
      id: "note6",
      title: notes[5],
      text: "Light, breathable clothing is recommended in summer due to desert heat, while warmer layers are needed in winter, especially in mountainous regions. Modest clothing is advised in rural areas and religious sites.",
    },
    {
      id: "note7",
      title: notes[6],
      text: "Strict rules apply to the export of cultural artifacts and carpets. You may need certificates for items purchased in bazaars. Importing and exporting certain goods may be restricted.",
    },
    {
      id: "note8",
      title: notes[7],
      text: "Cash is king in Turkmenistan, as credit cards are rarely accepted outside Ashgabat. Payments are usually made in manat. Bring enough cash (USD is widely exchangeable).",
    },
    {
      id: "note9",
      title: notes[8],
      text: "Internet access is limited and heavily restricted, with many popular sites blocked. Local SIM cards are available but often require registration. Expect slow connectivity.",
    },
    {
      id: "note10",
      title: notes[9],
      text: "In Ashgabat, taxis are the most common way to move around. Intercity travel often requires domestic flights or private drivers, as trains and buses can be slow.",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Turkmenistan" />
            </div>

            {/* ✅ Visit Section */}
            <section className={styles.visitSection}>
              <h2>Visit Turkmenistan</h2>
              <p>
                Turkmenistan offers a fascinating blend of history, desert
                landscapes, and unique cultural experiences. From the fiery
                Darvaza Gas Crater—famously called the “Door to Hell”—to the
                UNESCO World Heritage Sites of Merv and Kunya-Urgench, every
                journey uncovers something extraordinary. Ashgabat, the capital,
                showcases modern white marble architecture that contrasts with
                the vast Karakum Desert.
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
              <h3>Notes about Turkmenistan</h3>
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
                  <Link
                    to={`/Turkmenistan-${d}`}
                    className={styles.sidebarLink}
                  >
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
