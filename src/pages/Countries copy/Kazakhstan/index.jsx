import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Kazakhstan.module.scss";
import mainImg from "../../../assets/Countries/kazakhstan.jpeg";

export default function KazakhstanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "kazakhstan", name: "Kazakhstan" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Kazakhstan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Almaty",
    "Astana",
    "Shymkent",
    "Aktau",
    "Aktobe",
    "Karaganda",
    "Taraz",
    "Oskemen",
    "Kostanay",
    "Kyzylorda",
    "Pavlodar",
    "Petropavl",
    "Semey",
    "Turkestan",
    "Baikonur",
    "Charyn Canyon",
    "Burabay",
    "Medeu",
    "Shymbulak",
    "Lake Balkhash",
    "Caspian Sea",
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
      text: `Kazakhstan is one of the safest countries in Central Asia for travelers. In large cities such as Almaty and Astana, you will see police presence in tourist areas, keeping visitors safe. Violent crime is extremely rare and local people are very hospitable towards foreigners. It is always advised to take common-sense precautions, but in general Kazakhstan provides a safe travel experience.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Kazakhstan has a visa-free regime for citizens of many countries, including the EU, UK, USA, Canada, Japan, and others for stays up to 30 days. Neighboring CIS countries often enjoy longer visa-free stays. Travelers from countries not on the visa-free list can apply for an e-visa online. Registration with the migration police is typically handled automatically by hotels on arrival.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `The best time to visit Kazakhstan is during spring (April–June) and autumn (September–October), when temperatures are pleasant and landscapes are at their most beautiful. Summers can be very hot in the south and steppe regions, while winters in the north are extremely cold, especially in Astana where temperatures may fall below –20°C.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official language is Kazakh, but Russian is widely spoken across the country and serves as a common language of communication. In major cities, English is becoming increasingly common, especially in hotels and among younger generations.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `Kazakh cuisine is traditionally based on meat and dairy products, with dishes such as beshbarmak (boiled meat with noodles), kazy (horsemeat sausage), and shashlik (grilled skewered meat). Modern Kazakhstan also offers a wide variety of international cuisines in restaurants and cafes in major cities.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `Clothing depends on the season. Summers are hot in the steppe, so light and comfortable clothes are recommended, while winters are very cold, requiring heavy coats, hats, and gloves. When visiting religious sites, modest clothing is advised.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs regulations in Kazakhstan are straightforward. Travelers bringing cash under 10,000 USD do not need to declare it. Medicines for personal use are usually allowed but may need prescriptions. Standard international customs rules apply.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Payment by international credit and debit cards (Visa, MasterCard) is widely accepted in cities. However, it is recommended to carry some cash, especially when traveling to smaller towns or remote areas where card payments may not be available.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `SIM cards are easily available at airports and city centers. Mobile internet is fast and affordable. Most hotels and cafes provide free Wi-Fi, but in rural areas connection may be limited.`,
    },
    {
      id: "note10",
      title: notes[9],
      text: `In big cities, public buses, taxis, and ride-hailing apps like Yandex Go are widely used. For intercity travel, modern trains connect major destinations, while domestic flights are convenient for covering large distances.`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Kazakhstan" />
            </div>

            {/* ✅ Visit Kazakhstan Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Kazakhstan</h2>
              <p>
                Kazakhstan, the world’s ninth-largest country, offers a unique
                combination of modern cities, vast steppes, high mountains, and
                cultural heritage. From futuristic Astana with its bold
                architecture to the natural beauty of the Altai Mountains and
                Charyn Canyon, Kazakhstan is a land of contrasts. Visitors will
                discover traditions shaped by nomadic culture and the legendary
                Silk Road. Gotocentralasia.com invites you to explore this
                fascinating country where Asia meets Europe.
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
              <h3>Notes about Kazakhstan</h3>
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
