import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import styles from "./SilkRoad.module.scss";
import mainImg from "../../../assets/Countries/Silkroad.jpg";

export default function SilkRoadToursDestinations() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "silkroad", name: "Silk Road" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Silk Road`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    // Uzbekistan
    "Samarkand",
    "Bukhara",
    "Khiva",
    "Tashkent",
    "Shahrisabz",
    // Kazakhstan
    "Turkistan",
    "Almaty",
    "Shymkent",
    // Kyrgyzstan
    "Osh",
    "Bishkek",
    "Uzgen",
    "Tash Rabat Caravanserai",
    // Tajikistan
    "Khujand",
    "Istaravshan",
    "Panjakent",
    // Turkmenistan
    "Merv",
    "Konye-Urgench",
    "Ashgabat",
  ];

  const notes = [
    "Cultural significance",
    "Historic trade routes",
    "Architecture highlights",
    "Local traditions",
    "Cuisine on the Silk Road",
    "Weather and travel tips",
    "Border crossings",
    "Payment and currency",
    "Communication",
    "Transport options",
  ];

  const noteTexts = [
    {
      id: "note1",
      title: notes[0],
      text: `The Silk Road is one of the most influential trade networks in world history. It connected Asia, the Middle East, and Europe, shaping economies and cultures for centuries.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Merchants traveled across thousands of kilometers, linking China’s silk and porcelain with Europe’s glassware, creating a unique exchange of goods and knowledge.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `From Samarkand’s Registan Square to Bukhara’s Ark Fortress, architectural wonders flourished along the route, blending Persian, Islamic, and Central Asian styles.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `Local traditions along the Silk Road emphasize hospitality. Travelers are often welcomed with tea, bread, and warm smiles, continuing centuries-old customs.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Cuisine on the Silk Road reflects Persian spices, Chinese noodles, and Central Asian lamb dishes. Each stop reveals a new cultural flavor.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Spring and autumn offer the most pleasant weather for traveling the route. Summers can be scorching in deserts, while winters bring snow in mountain regions.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Border regulations vary across countries. Travelers should check visa requirements in advance, especially for Turkmenistan and China.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `While cards are accepted in major cities, rural areas still rely heavily on cash. USD and EUR are widely exchangeable at banks.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `Mobile and internet connections are reliable in urban centers but weaker in mountainous and desert zones. Prepaid SIM cards are easy to obtain.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Travel options include high-speed trains in Uzbekistan, shared taxis in Tajikistan, buses in Kyrgyzstan, and local flights for long distances.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Silk Road" />
            </div>

            {/* ✅ Visit Silk Road Intro */}
            <section className={styles.visitSection}>
              <h2>Explore the Silk Road</h2>
              <p>
                The Silk Road connected East and West for centuries, serving as
                a trade route and cultural bridge. From the vibrant cities of
                Uzbekistan to the nomadic landscapes of Kyrgyzstan and the
                deserts of Turkmenistan, it shaped civilizations through
                exchange of goods, knowledge, and traditions.
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
              <h3>Notes about the Silk Road</h3>
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
