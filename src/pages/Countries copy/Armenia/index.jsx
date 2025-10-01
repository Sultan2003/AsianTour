import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Armenia.module.scss";
import mainImg from "../../../assets/Countries/armenia.jpg";

export default function ArmeniaToursDestination() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "armenia", name: "Armenia" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Armenia`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Yerevan",
    "Lake Sevan",
    "Dilijan",
    "Garni Temple",
    "Geghard Monastery",
    "Khor Virap",
    "Noravank",
    "Gyumri",
    "Amberd Fortress",
    "Tatev Monastery",
    "Jermuk",
    "Areni",
    "Etchmiadzin",
    "Saghmosavank",
    "Haghpat",
    "Sanahin",
    "Zvartnots Cathedral",
    "Debed Canyon",
    "Shaki Waterfall",
    "Selim Caravanserai",
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
      text: `Armenia is one of the safest countries to travel in the Caucasus. 
      Crime rates are low, and visitors can feel secure exploring both cities and rural areas. 
      Police presence is noticeable in Yerevan and tourist sites, and locals are known for their warmth and hospitality. 
      Travelers are often greeted with genuine kindness and help when needed.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Citizens of many countries can enter Armenia visa-free for up to 180 days per year. 
      For other nationalities, an electronic visa (e-visa) system is available, which is fast and easy to obtain online. 
      A valid passport with at least 6 months remaining is required. 
      Registration is not typically required for short-term stays, but hotels will handle it if needed.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `The best seasons to visit Armenia are spring (April–June) and autumn (September–October). 
      Summers can be hot, especially in Yerevan, with temperatures over 35°C, while winters can be snowy and cold, 
      particularly in the mountains. Spring and autumn provide pleasant weather for sightseeing, hiking, and cultural tours.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official language of Armenia is Armenian, one of the world’s oldest languages. 
      Russian is widely spoken as a second language, and English is increasingly used in major tourist areas, 
      hotels, and restaurants. Learning a few Armenian phrases will delight locals and add to your experience.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Armenian cuisine is rich and flavorful, known for dishes like khorovats (barbecue), dolma (stuffed grape leaves), 
      khash, and lavash (traditional flatbread, recognized by UNESCO). 
      Local fruits, vegetables, and wines are also highlights. 
      Don’t miss trying apricots, pomegranates, and the famous Armenian brandy.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Casual, comfortable clothing is recommended, especially for exploring monasteries and mountains. 
      In religious sites, modest dress is appreciated: women may bring a scarf to cover their head, 
      and both men and women should cover shoulders and knees. 
      Weather in spring and autumn is mild, but bring a light jacket for evenings.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs regulations are straightforward. Visitors may bring personal belongings without restriction 
      and up to 10,000 USD in cash without declaration. 
      Prescription medicines should be declared if carried in large quantities. 
      Export of cultural artifacts (such as old manuscripts or carpets) requires special permission.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Credit cards are widely accepted in Yerevan, especially VISA and MasterCard. 
      However, cash (Armenian Dram, AMD) is preferred in rural areas. 
      Currency exchange is available at banks and exchange points, with rates generally stable. 
      ATMs are easy to find in major towns and cities.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `Local SIM cards are affordable and can be purchased at the airport or in Yerevan. 
      Operators like Viva-MTS, Ucom, and Beeline provide good coverage and 4G internet. 
      Wi-Fi is common in hotels, cafes, and public places. 
      Mobile internet speeds are generally reliable, even outside big cities.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Public transport in Yerevan includes buses, minibuses (marshrutkas), and a simple metro system. 
      Taxis are inexpensive, especially when booked through mobile apps. 
      For intercity travel, minibuses connect Yerevan with most towns. 
      Renting a car is also an option for exploring Armenia’s countryside and mountain regions.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Armenia" />
            </div>

            {/* ✅ Visit Armenia Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Armenia</h2>
              <p>
                Armenia, the first country to adopt Christianity, is a land of
                ancient monasteries, dramatic mountain scenery, and warm
                hospitality. From the vibrant capital of Yerevan to the serene
                beauty of Lake Sevan and the spiritual atmosphere of
                centuries-old monasteries, Armenia offers travelers a unique
                journey into history, culture, and nature. Experience authentic
                cuisine, deep traditions, and the legendary Armenian hospitality
                on your trip.
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
              <h3>Notes about Armenia</h3>
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
