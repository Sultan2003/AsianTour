import React from "react";
import styles from "./Uzbekistan.module.scss";
import mainImage from "../../../assets/images/uzb-registan.jpg"

export default function UzbekistanTours() {
      
  const tours = [
    {
      date: "Oct 3",
      title: "Classic Uzbekistan Group Tour",
      cities: "Tashkent, Khiva, Bukhara, Samarkand",
      status: "Available",
      days: 8,
      price: "$1,390",
      departures: 47,
    },
    {
      date: "Oct 11",
      title: "Uzbekistan Relaxed Group Tour",
      cities: "Tashkent, Khiva, Bukhara, Gijduvan, Samarkand",
      status: "Available",
      days: 10,
      price: "$1,550",
      departures: 10,
    },
    {
      date: "Oct 17",
      title: "Darvaza Gas Crater Group Tour",
      cities: "Darvaza gas crater, Kunya-Urgench",
      status: "Available",
      days: 2,
      price: "$530",
      departures: 38,
    },
  ];

  const destinations = [
    "Tashkent","Samarkand","Bukhara","Khiva","Andijan","Aral Sea","Baysun","Beldersay",
    "Charvak","Chimgan","Fergana","Jizzakh","Karakalpakstan","Karshi","Kokand","Kuva",
    "Margilan","Muynak","Namangan","Navoi","Nukus","Nurata","Rishtan","Sarmish-say Petroglyphs",
    "Shakhimardan","Shakhrisabz","Termez","Urgench","Ustyurt Plateau","Yangiabad"
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <img src={mainImage} alt="Uzbekistan" />
        </div>

        <div className={styles.content}>
          <div className={styles.tours}>
            <h2>Upcoming Group Departures</h2>
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Days</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour, idx) => (
                  <tr key={idx}>
                    <td className={styles.date}>{tour.date}</td>
                    <td>
                      <strong>{tour.title}</strong>
                      <p className={styles.cities}>{tour.cities}</p>
                      <a href="#"> {tour.departures} more departures &gt;&gt;&gt;</a>
                    </td>
                    <td className={tour.status === "Available" ? styles.available : styles.unavailable}>
                      {tour.status}
                    </td>
                    <td>{tour.days}</td>
                    <td>{tour.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.description}>
              Visit Uzbekistan and discover stunning medieval cities with tall minarets reaching into the sky. See local pilgrims in bright, colorful robes and experience the lively atmosphere of bustling bazaars filled with rich aromas and friendly voices. A trip to Uzbekistan is both exciting and welcoming, offering a mix of adventure and comfort.
            </p>
          </div>

          <div className={styles.sidebar}>
            <h3>Travel Destinations</h3>
            <ul>
              {destinations.map((d, i) => (
                <li key={i}><a href="#">{d}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
