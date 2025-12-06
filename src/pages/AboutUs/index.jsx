import styles from "./AboutUs.module.scss";

export default function AboutUs() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About Us</h1>

      <p className={styles.text}>
        Gotocentralasia.com is a project by Miramax Travel Management, a
        distinct and well-known travel agency in Uzbekistan. Since 2003, it has
        been successfully offering travelers various services under inbound and
        outbound tourism.
      </p>

      <p className={styles.text}>
        The main goal of the project is to offer and share cultural experiences
        of the local people of Central Asia and the Caucasus with the world.
      </p>

      <p className={styles.text}>
        For generations, Central Asia and the Caucasus remained untouched by
        mainstream travelers. Once-famous cities and people who played major
        roles in world history were unknown to the public and undeservedly
        forgotten.
      </p>

      <p className={styles.text}>
        We would love to share our ancient history, unique culture, and old
        traditions with you. We invite you to be part of this journey through
        centuries and experience it for yourself.
      </p>
    </div>
  );
}
