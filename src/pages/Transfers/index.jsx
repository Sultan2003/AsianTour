import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "./Transfers.module.scss";
import bus from "../../assets/Transports/bus.jpg";
import minivan from "../../assets/Transports/minivan.jpg";
import sedan from "../../assets/Transports/sedan.jpg";

const translations = {
  en: {
    title: "Transfer Services",
    description:
      "Travel comfortably between airports, train stations, and cities with our reliable private transfer services. Choose the perfect vehicle type for your journey and enjoy a smooth, worry-free experience.",
    vehicles: { sedan: "Sedan", minivan: "Minivan", bus: "Bus" },
    airportTitle: "Airport Transfer Prices (USD):",
    trainTitle: "Train Station Transfer Prices (USD):",
    intercityTitle: "Intercity Transfer Prices (USD):",
    vehicleType: "Vehicle Type",
    cities: {
      tashkent: "Tashkent",
      samarkand: "Samarkand",
      bukhara: "Bukhara",
      urgench: "Urgench",
      khiva: "Khiva",
      nukus: "Nukus",
    },
    routes: {
      tashkentSamarkand: "Tashkent to Samarkand",
      samarkandBukhara: "Samarkand to Bukhara",
      bukharaKhiva: "Bukhara to Khiva",
      khivaNukus: "Khiva to Nukus",
    },
    uponRequest: "upon request",
  },
  ru: {
    title: "Услуги трансфера",
    description:
      "Комфортные поездки между аэропортами, вокзалами и городами с нашими надёжными частными трансферами. Выберите подходящий тип автомобиля и наслаждайтесь спокойной поездкой без лишних забот.",
    vehicles: { sedan: "Седан", minivan: "Минивэн", bus: "Автобус" },
    airportTitle: "Цены на трансфер из аэропорта (USD):",
    trainTitle: "Цены на трансфер с вокзала (USD):",
    intercityTitle: "Цены на междугородние трансферы (USD):",
    vehicleType: "Тип транспорта",
    cities: {
      tashkent: "Ташкент",
      samarkand: "Самарканд",
      bukhara: "Бухара",
      urgench: "Ургенч",
      khiva: "Хива",
      nukus: "Нукус",
    },
    routes: {
      tashkentSamarkand: "Ташкент — Самарканд",
      samarkandBukhara: "Самарканд — Бухара",
      bukharaKhiva: "Бухара — Хива",
      khivaNukus: "Хива — Нукус",
    },
    uponRequest: "по запросу",
  },
};

export default function Transfers() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang] || translations.en;
  const transportTypes = [
    { name: t.vehicles.sedan, img: sedan },
    { name: t.vehicles.minivan, img: minivan },
    { name: t.vehicles.bus, img: bus },
  ];

  const airportTransfers = [
    [t.vehicles.sedan, 25, 25, 25, 30],
    [t.vehicles.minivan, 50, 50, 50, 60],
    [t.vehicles.bus, 100, 100, 100, t.uponRequest],
  ];

  const trainTransfers = [
    [t.vehicles.sedan, 25, 25, 25, 20],
    [t.vehicles.minivan, 50, 50, 50, 40],
    [t.vehicles.bus, 100, 100, 100, t.uponRequest],
  ];

  const intercityTransfers = [
    [t.vehicles.sedan, 170, 170, 180, 120],
    [t.vehicles.minivan, 320, 320, 350, 250],
    [t.vehicles.bus, t.uponRequest, t.uponRequest, t.uponRequest, t.uponRequest],
  ];

  const renderTable = (title, headers, rows) => (
    <div className={styles.tableSection}>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>{t.vehicleType}</th>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{t.title}</h1>
        <p className={styles.pageDescription}>{t.description}</p>

        <div className={styles.transportGallery}>
          {transportTypes.map((item, i) => (
            <div key={i} className={styles.transportCard}>
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {renderTable(
          t.airportTitle,
          [t.cities.tashkent, t.cities.samarkand, t.cities.bukhara, t.cities.urgench],
          airportTransfers,
        )}
        {renderTable(
          t.trainTitle,
          [t.cities.tashkent, t.cities.samarkand, t.cities.bukhara, t.cities.khiva],
          trainTransfers,
        )}
        {renderTable(
          t.intercityTitle,
          [
            t.routes.tashkentSamarkand,
            t.routes.samarkandBukhara,
            t.routes.bukharaKhiva,
            t.routes.khivaNukus,
          ],
          intercityTransfers,
        )}
      </div>
    </div>
  );
}
