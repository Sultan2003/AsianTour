import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Tajikistan.module.scss";
import mainImg from "../../../assets/Countries/tajikistan.jpg";

export default function TajikistanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "tajikistan", name: "Tajikistan" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Tajikistan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Dushanbe",
    "Khujand",
    "Istaravshan",
    "Kulob",
    "Pamir Mountains",
    "Khorog",
    "Murghab",
    "Fann Mountains",
    "Panjakent",
    "Iskanderkul Lake",
    "Nurek Dam",
    "Wakhan Valley",
    "Seven Lakes",
    "Yagnob Valley",
    "Sarazm",
    "Bartang Valley",
    "Shahriston Pass",
    "Hissar Fortress",
    "Varzob",
    "Garm",
    "Danghara",
    "Romit Gorge",
    "Zeravshan Valley",
    "Lake Karakul",
    "Fergana Valley",
  ];

  const notes = [
    "Travel safety matters",
    "Visa and border crossing",
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
      text: `Tajikistan is considered generally safe for travelers, especially in the main tourist regions like Dushanbe, Khujand, or the Fann Mountains. As in any country, standard travel precautions should be taken, but violent crime against tourists is rare. Border areas near Afghanistan require extra caution and travel permits.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Most travelers need a visa for Tajikistan, which can be obtained through the e-visa system. The visa is usually valid for 45 days. If planning to visit the Pamir Highway (GBAO region), you will need an additional GBAO permit. Border crossings with Uzbekistan, Kyrgyzstan, and China are open but require proper documents.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `The best time to visit Tajikistan is during late spring (May–June) and early autumn (September–October). Summers can be extremely hot in lowlands, while winters bring heavy snow in the mountains, making some roads impassable. For trekking in the Pamirs or Fann Mountains, summer months are ideal.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official language is Tajik (a variant of Persian), but Russian is widely spoken, especially in cities. In remote mountain areas, you may also encounter Pamiri languages. English is less common but is growing among younger generations and in the tourism sector.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Tajik cuisine is hearty and simple. Plov (rice with meat and vegetables), qurutob (flatbread with yogurt sauce), and shashlik (kebabs) are common dishes. Fresh fruits, especially apricots and pomegranates, are widely available in summer. Tea is a cultural staple, served with almost every meal.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Pack for both warm days and cool nights, especially if traveling to the mountains. Comfortable walking shoes are essential for trekking. Respectful clothing is recommended in rural areas and religious sites—long sleeves and modest attire for both men and women.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs regulations are straightforward. Travelers may bring personal items and reasonable amounts of currency without issue. Importing drones and professional camera equipment may require permits. Carry prescriptions for any medicine you bring.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Credit cards are accepted in Dushanbe and some large hotels, but cash (Tajik Somoni – TJS) is the main form of payment, especially in rural areas. ATMs are limited outside major cities. Carry small denominations for easier transactions.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `SIM cards are available in Dushanbe and regional centers from providers such as Tcell, MegaFon, and Beeline. Internet coverage in rural and mountain areas is limited, but Wi-Fi is available in hotels and some cafes.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Public transport is limited mainly to marshrutkas (minibuses) and shared taxis. For long-distance travel, private drivers are common. Roads in the mountains can be rough but offer some of the most scenic journeys in Central Asia. The Pamir Highway is a highlight for adventurous travelers.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Tajikistan" />
            </div>

            {/* ✅ Visit Tajikistan Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Tajikistan</h2>
              <p>
                Tajikistan is a land of rugged mountains, alpine lakes, and
                ancient Silk Road history. Discover the legendary Pamir Highway,
                trek through the breathtaking Fann Mountains, and experience the
                warmth of Tajik hospitality in remote villages. From vibrant
                Dushanbe to the high plateaus of the Pamirs, Tajikistan offers a
                true adventure for nature lovers and cultural explorers alike.
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
              <h3>Notes about Tajikistan</h3>
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
