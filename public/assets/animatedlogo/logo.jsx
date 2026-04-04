import styles from "./AnimatedLogo.module.scss";
import logo from "../../../src/assets/background/logo_white.png";

export default function AnimatedLogo() {
  return (
    <div className={styles.logoWrapper}>
      <div className={styles.icon}>
        <img src={logo} alt="GoToCentralAsia" />
      </div>

     
    </div>
  );
}
