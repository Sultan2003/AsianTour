import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Caucasus.module.scss";
import mainImg from "../../../assets/Countries/Caucasus.jpg";

export default function CaucasusTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "caucasus", name: "Caucasus" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Caucasus`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    // Georgia
    "Tbilisi",
    "Mtskheta",
    "Kazbegi",
    "Batumi",
    "Kutaisi",
    "Svaneti",
    "Uplistsikhe",
    "Borjomi",
    "David Gareja",
    "Kakheti",
    // Armenia
    "Yerevan",
    "Garni",
    "Geghard Monastery",
    "Lake Sevan",
    "Dilijan",
    "Tatev Monastery",
    "Khor Virap",
    "Noravank",
    "Gyumri",
    "Amberd Fortress",
    // Azerbaijan
    "Baku",
    "Gobustan",
    "Sheki",
    "Quba",
    "Gabala",
    "Khinalug",
    "Lahij",
    "Naftalan",
    "Shamakhi",
    "Nakhchivan",
  ];

  const notes = [
    "Travel safety matters",
    "Visa and border requirements",
    "Best time to visit",
    "Languages spoken",
    "Cuisine",
    "Clothing and weather",
    "Customs and traditions",
    "Payment issues",
    "Mobile phone and Internet",
    "How to get around (local transport)",
  ];

  const noteTexts = [
    {
      id: "note1",
      title: notes[0],
      text: "The Caucasus region is generally safe for travelers, with warm hospitality in Georgia, Armenia, and Azerbaijan. However, border regions can be sensitive, so it’s important to check the latest travel advisories. Petty theft is rare, and locals are welcoming to visitors.",
    },
    {
      id: "note2",
      title: notes[1],
      text: "Each country in the Caucasus has different entry requirements. Georgia allows visa-free entry to many nationalities, Armenia provides visa-free or e-visa options, while Azerbaijan typically requires an e-visa. Border crossings between the three countries are straightforward, but note that Armenia and Azerbaijan have closed borders due to political conflict.",
    },
    {
      id: "note3",
      title: notes[2],
      text: "Spring (April–June) and autumn (September–October) are the best times to visit the Caucasus, with pleasant weather for hiking, sightseeing, and wine tasting. Winters are popular for skiing in Gudauri (Georgia) or Tsaghkadzor (Armenia). Summers can be hot in lowlands but cool in mountain regions.",
    },
    {
      id: "note4",
      title: notes[3],
      text: "Georgian, Armenian, and Azerbaijani are the official languages, but Russian is widely understood across the region. English is increasingly common in major cities, especially among younger generations and in tourism services.",
    },
    {
      id: "note5",
      title: notes[4],
      text: "Caucasian cuisine is famous for its variety: khachapuri and khinkali in Georgia, lavash and dolma in Armenia, plov and kebabs in Azerbaijan. Wine traditions are strong, especially in Georgia, often regarded as the cradle of winemaking.",
    },
    {
      id: "note6",
      title: notes[5],
      text: "Light clothing works well in summer, but pack warmer layers for evenings in the mountains. Winters in the Caucasus can be cold with heavy snow in high-altitude areas. Modest dress is recommended when visiting churches, monasteries, and mosques.",
    },
    {
      id: "note7",
      title: notes[6],
      text: "Local traditions are deeply respected. In Georgia, the supra (feast) is a key cultural element, led by a toastmaster. Armenians emphasize hospitality and family values, while Azerbaijanis highlight respect and generosity. Visitors are encouraged to participate and show respect.",
    },
    {
      id: "note8",
      title: notes[7],
      text: "Credit cards are accepted in major cities, but cash is often needed in rural areas. Local currencies are the Georgian Lari, Armenian Dram, and Azerbaijani Manat. ATMs are common in urban areas, but bring cash when traveling to smaller towns or mountain regions.",
    },
    {
      id: "note9",
      title: notes[8],
      text: "Internet access is generally reliable in cities, with free Wi-Fi in many cafes and hotels. SIM cards are inexpensive and easy to purchase in each country. Coverage can be limited in remote mountain areas.",
    },
    {
      id: "note10",
      title: notes[9],
      text: "Transportation is varied: minibuses (marshrutkas) connect cities and towns, while trains link Tbilisi, Yerevan, and Baku. Taxis and ride-hailing apps are common in cities. Renting a car is an option for exploring remote mountain regions.",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Caucasus" />
            </div>

            {/* ✅ Visit Section */}
            <section className={styles.visitSection}>
              <h2>Visit the Caucasus</h2>
              <p>
                The Caucasus is a fascinating crossroads between Europe and
                Asia, offering snow-capped mountains, ancient monasteries,
                vibrant cities, and unique cultures. From Georgia’s scenic
                vineyards and Armenia’s historic temples to Azerbaijan’s blend
                of modern architecture and Caspian coastline, this region is
                full of diversity. It is a destination for adventurers, history
                lovers, and food enthusiasts alike.
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
              <h3>Notes about the Caucasus</h3>
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
