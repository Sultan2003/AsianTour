import Header from "../../components/Header";
import styles from "./MainPage.module.scss";

export default function MainPage() {
  return (
    <div className={styles.mainPage}>
        <Header/>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Discover the Silk Road</h1>
          <p>with expertly crafted tours by a local operator</p>
        </div>
      </div>
    </div>
  );
}
