import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import styles from "./Uzbekistan.module.scss";
import mainImg from "../../../assets/Countries/uzb-registan.jpg";

export default function UzbekistanTours() {
  const { lang: strapiLocale } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);

  const countries = [{ slug: "uzbekistan", name: "Uzbekistan" }];

  useEffect(() => {
    fetch(
      `https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?locale=${strapiLocale}&filters[location][$eq]=Uzbekistan`
    )
      .then((res) => res.json())
      .then((data) => setTours(data.data || []))
      .catch((err) => console.error(err));
  }, [strapiLocale]);

  const destinations = [
    "Tashkent",
    "Samarkand",
    "Bukhara",
    "Khiva",
    "Andijan",
    "Aral Sea",
    "Baysun",
    "Beldersay",
    "Charvak",
    "Chimgan",
    "Fergana",
    "Jizzakh",
    "Karakalpakstan",
    "Karshi",
    "Kokand",
    "Kuva",
    "Margilan",
    "Muynak",
    "Namangan",
    "Navoi",
    "Nukus",
    "Nurata",
    "Rishtan",
    "Sarmish-say Petroglyphs",
    "Shakhimardan",
    "Shakhrisabz",
    "Termez",
    "Urgench",
    "Ustyurt Plateau",
    "Yangiabad",
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
      text: `According to international Numbeo ranking agency, Uzbekistan making progress in public safety matters year by year, representing itself as the safest country in the region. In 2025, countries safety index was 73.4 which puts it ahead of countries like Switzerland (73.3), South Korea (73.1) or Austria (71.7). In historic sights you will be able to see Tourist Police officers patrolling arias most visited by international travelers or city guests often offering help. There is no violent crime or robbery. Public Police cars are on constant duty keeping steers and districts safe. Local people are quite gentle and helpful towards guests and willing to offer any kind of help or support. You do not need to get worried about awkwardness of situations, people are open and welcoming with open hearts. Overall, you will get impression of genuine safety.`,
    },
    {
      id: "note2",
      title: notes[1],
      text: `Uzbekistan has a free visa policy towards most of countries. Foreign citizen can visit Uzbekistan for personal, official, tourist, vacation, study and medical treatment purposes. All needed is valid national passport with a validity more than 6 months from the date of entry. There are nationalities with unlimited visa free regime. Citizens from Azerbaijan, Georgia, Armenia, Belarus, Kazakhstan, Moldova, Russia and Ukraine are granted with unlimited visa free regime. Citizen of EU and countries like Canada, Israil, UK, Japan, Australia and many more can travel visa free up to 30 days. Also, citizen of almost 60 countries, including the USA, China, South Africa, India, Iran and others can obtain simplified electronic visa (e-visa) up to 30 days. The processing time for a visa application is 2 working days and can be sent to traveler by e-mail. The cost of a single time e-visa is 20 USD. Registration matter should be looked at, as all foreign citizen traveling to Uzbekistan will need to get registration at the place for residence within 3 days from the date of arrival. Almost all hotels and hostels will make registration on guest arrival and will provide you with confirmation at your request.`,
    },
    {
      id: "note3",
      title: notes[2],
      text: `It would be wrong to say that you can travel to Uzbekistan all year along. Surely, in summer, when outside temperature hits about 40 degrees Celsius or even more, stay under burning sun would not be a good idea. Also, winters, can make surprises, with its snowfall and cold wet wind, will make your stay less pleasant. The best time to visit would be spring or autumn months, when average temperature will be from 15-20 degrees Celsius to 25-30 degrees Celsius. This is when you will get the most out of your trip. However, it would be fair to say that, travelers do visit Uzbekistan in summers and winters, despite the weather difficulties, planning most of the travel sights to be indoors.`,
    },
    {
      id: "note4",
      title: notes[3],
      text: `The official state language of Uzbekistan is Uzbek, and majority of the people speak Uzbek language. But, Russian can be used as language of communication as almost all local people can speak Russian too. Tadjik language can be met, as local, in Samarkand and Bukhara. English is used everywhere as a first language to communicate with foreigners and guests.`,
    },
    {
      id: "note5",
      title: notes[4],
      text: `It is quite extraordinary when it comes to local cuisine, as at any nation daily food and all what comes with it represents nation culture and echoes to its history. Uzbek cuisine is no exception. For centuries local people have developed its own food culture and still keep them as national heritage. The most well-known Uzbek dish is Uzbek plov. It is recognized not only in the region but by far beyond its borders. Local restaurants are rich in offerings. In the menu you will find all sorts of dishes, start from local to dishes from Europe and Asia, Middle East and America. Street Fast food is also present as an option.`,
    },
    {
      id: "note6",
      title: notes[5],
      text: `For clothing, it is recommended to choose comfortable casual wearing’s to feel yourself normal for temperatures up to 25-30 degrees Celsius. Shoes must be comfortable as plenty of walking are meant to be done. Hats and sunglasses are also recommended. It is worth mentioning that travelers are ask to keep certain rules while visiting certain sights, in general it is related to Islamic tradition. Clothing should cover arms and legs, women might need a scarf to cover their heads. Average temperature may vary from 15-20 degrees Celsius during the day to 10-15 degrees Celsius at night in spring. Autumn may be a little warmer than spring but light showers and windy days might ketch you any day.`,
    },
    {
      id: "note7",
      title: notes[6],
      text: `Customs regulations are not complex and almost the same as in EU or Asia countries. For travelers who have no medicine to declare and have less than 10 thousand USD in cash (or equivalent in another currency), “green corridor” applicable and they do not need to fill customs declaration. In cases when travelers have particular medical prescriptions and have to bring their medicine with them, these have to be mentioned in customs declaration. Also amounts in cash more than 10 thousand USD in cash (or equivalent in another currency) have to be mentioned in declaration.`,
    },
    {
      id: "note8",
      title: notes[7],
      text: `Credit or Debit card with VISA or Marter card is widely used in big cities like Tashkent, Samarkand or Bukhara. Especially for payment in hotels, supermarkets or shops. All these cards are excepted unless if the traveler from the country which is under international sanctions. However, it is recommended to have small amount of cash on so it might cover small purchases at gift shops or caffes. At gifts shops, foreign currencies like USD or EURO are welcomed, but for purchases from general public places local currency to be excepted only. Foreign currencies can be exchanged in any branch of local banks.`,
    },
    {
      id: "note9",
      title: notes[8],
      text: `The most convenient way to obtained mobile phone connection and internet access is to purchase a SIM card at the arrivals in the airport. Also, travelers may to get a SIM card the at the official branches of one of four main mobile network operators. 
Hotels offer free Wi-Fi connection. Some public places, caffes or restaurants, some local transport and others may offer free internet connection, although speed qualify may not as good as to be expected. `,
    },
    {
      id: "note10",
      title: notes[9],
      text: `Large cities like Tashkent, Samarkand, Bukhara have a great public transport system. Travelers may easily use public transport within cities to get from one point to another, and it will not cost much. 
Use modern, high-speed train for travels between cities like Tashkent, Samarkand and Bukhara. Local airways also offer affordable and convenient options as an alternative to travel from one city to another..`,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tours}>
            {/* ✅ Main Image */}
            <div className={styles.mainImage}>
              <img src={mainImg} alt="Uzbekistan" />
            </div>

            {/* ✅ Visit Uzbekistan Intro */}
            <section className={styles.visitSection}>
              <h2>Visit Uzbekistan</h2>
              <p>
                Uzbekistan is a must-see destination on The Silk Road or among
                Central Asia countries. As it was in the past throw out its long
                history, so it is now, Uzbekistan represents a core traditions
                and culture of nationalities who have been settling in this part
                of the world. Centuries old cities, unique culture, kind local
                people and unseen atmosphere will make your trip unforgettable.
                For thousands of years, by being on the heart of The Silk Road
                and making trade, hosting and welcoming main world religions in
                their lives, local people have developed their own captivating
                culture and traditions. All these you are able to see on the
                built architectures, feel in the mosques and palaces and
                evaluate in technologies and scientistic discoveries of ancient
                times. Gotocentralasia.com provides the opportunity for
                travelers from all around the world to immerse in the atmosphere
                of ancient adventure, uzbek hospitality and traditions.
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
              <h3>Notes about Uzbekistan</h3>
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
