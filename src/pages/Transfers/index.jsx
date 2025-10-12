import styles from "./Transfers.module.scss";
import bus from "../../assets/Transports/bus.jpg";
import minivan from "../../assets/Transports/minivan.jpg";
import sedan from "../../assets/Transports/sedan.jpg";

export default function Transfers() {
  const transportTypes = [
    {
      name: "Sedan",
      img: sedan,
    },
    {
      name: "Minivan",
      img: minivan,
    },
    {
      name: "Bus",
      img: bus,
    },
  ];

  const airportTransfers = [
    ["Sedan", 25, 25, 25, 30],
    ["Minivan", 50, 50, 50, 60],
    ["Bus", 100, 100, 100, "upon request"],
  ];

  const trainTransfers = [
    ["Sedan", 25, 25, 25, 20],
    ["Minivan", 50, 50, 50, 40],
    ["Bus", 100, 100, 100, "upon request"],
  ];

  const intercityTransfers = [
    ["Sedan", 170, 170, 180, 120],
    ["Minivan", 320, 320, 350, 250],
    ["Bus", "upon request", "upon request", "upon request", "upon request"],
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Transfer Services</h1>
        <p className={styles.pageDescription}>
          Travel comfortably between airports, train stations, and cities with
          our reliable private transfer services. Choose the perfect vehicle
          type for your journey and enjoy a smooth, worry-free experience.
        </p>

        {/* Transport Types */}
        <div className={styles.transportGallery}>
          {transportTypes.map((item, i) => (
            <div key={i} className={styles.transportCard}>
              <img src={item.img} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Airport Transfers */}
        <div className={styles.tableSection}>
          <h2>Airport Transfer Prices (USD):</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Tashkent</th>
                <th>Samarkand</th>
                <th>Bukhara</th>
                <th>Urgench</th>
              </tr>
            </thead>
            <tbody>
              {airportTransfers.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Train Transfers */}
        <div className={styles.tableSection}>
          <h2>Train Station Transfer Prices (USD):</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Tashkent</th>
                <th>Samarkand</th>
                <th>Bukhara</th>
                <th>Khiva</th>
              </tr>
            </thead>
            <tbody>
              {trainTransfers.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Intercity Transfers */}
        <div className={styles.tableSection}>
          <h2>Intercity Transfer Prices (USD):</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Tashkent to Samarkand</th>
                <th>Samarkand to Bukhara</th>
                <th>Bukhara to Khiva</th>
                <th>Khiva to Nukus</th>
              </tr>
            </thead>
            <tbody>
              {intercityTransfers.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
