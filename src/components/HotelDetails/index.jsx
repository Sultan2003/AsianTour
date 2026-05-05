import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./hotels.module.scss";

const BASE_URL = "https://brilliant-passion-7d3870e44b.strapiapp.com/api";

const Hotels = () => {
  const [hotel, setHotel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { slug } = useParams();

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(
        `${BASE_URL}/hotelss?filters[slug][$eq]=${slug}&populate=*`,
      );

      const data = await res.json();

      if (data?.data?.length > 0) {
        setHotel(data.data[0]);
      }
    };

    fetchHotel();
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!hotel) return <div>Loading...</div>;

  const attributes = hotel;
  const gallery = attributes.gallery || [];

  /* ---------- HELPERS ---------- */
  const getText = (children) =>
    children?.map((c) => c.text || c.url || "").join("");

  const getBlocksText = (blocks) =>
    blocks?.map((b) => getText(b.children)).join("\n") || "";

  /* ---------- DESCRIPTION ---------- */
  const descriptionText = getBlocksText(attributes.description);

  /* ---------- ROOMS ---------- */
  const parseRooms = (blocks) => {
    if (!blocks) return [];

    const text = getBlocksText(blocks);
    const raw = text.split("#ROOM").filter(Boolean);

    return raw.map((section) => {
      const lines = section
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      let room = { title: "", description: "", price: "", image: "" };
      let mode = "title";

      lines.forEach((line) => {
        if (line === "#PRICE") return (mode = "price");
        if (line === "#IMAGE") return (mode = "image");

        if (!room.title) return (room.title = line);

        if (mode === "price") room.price = line;
        else if (mode === "image" && line.startsWith("http")) room.image = line;
        else room.description += line + " ";
      });

      return room;
    });
  };

  const rooms = parseRooms(attributes.rooms);

  /* ---------- CONTACTS ---------- */
  const parseContacts = (blocks) => {
    if (!blocks) return { address: "", phones: [], email: "" };

    const text = getBlocksText(blocks);
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const res = { address: "", phones: [], email: "" };
    let mode = "";

    lines.forEach((line) => {
      if (line === "#ADDRESS") return (mode = "address");
      if (line === "#PHONE") return (mode = "phone");
      if (line === "#EMAIL") return (mode = "email");

      if (mode === "address") res.address = line;
      if (mode === "phone") res.phones.push(line);
      if (mode === "email") res.email = line;
    });

    return res;
  };

  const contacts = parseContacts(attributes.contacts);

  /* ---------- TERMS ---------- */
  const parseTerms = (blocks) => {
    if (!blocks) return [];

    const text = getBlocksText(blocks);
    return text
      .split("#TERM")
      .map((t) => t.trim())
      .filter(Boolean);
  };

  const terms = parseTerms(attributes.termsOfStay);

  /* ---------- UI ---------- */
  return (
    <div className={styles.page}>
      {/* ---------- CAROUSEL ---------- */}
      <div className={styles.carousel}>
        {gallery.map((img, i) => (
          <div
            key={i}
            className={`${styles.slide} ${
              i === activeIndex % gallery.length ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${img.url})` }}
          />
        ))}
      </div>

      {/* ---------- ABOUT / DESCRIPTION ---------- */}
      <section className={styles.section}>
        <h1>{attributes.title}</h1>

        <div className={styles.about}>
          {attributes.mainImage && <img src={attributes.mainImage.url} />}

          <div>
            <p>{descriptionText}</p>
          </div>
        </div>
      </section>

      {/* ---------- TERMS ---------- */}
      <section className={styles.section}>
        <h2>Terms of Stay</h2>

        <table className={styles.terms}>
          <tbody>
            {terms.map((term, i) => (
              <tr key={i}>
                <td>{term}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---------- ROOMS ---------- */}
      <section className={styles.section}>
        <h2>Rooms</h2>

        <div className={styles.rooms}>
          {rooms.map((room, i) => (
            <div key={i} className={styles.card}>
              {room.image && <img src={room.image} />}

              <h3>{room.title}</h3>
              <p>{room.description}</p>
              <span>{room.price}</span>

              <button>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CONTACTS ---------- */}
      <section className={styles.section}>
        <h2>Contact Details</h2>

        <div className={styles.contacts}>
          <p>{contacts.address}</p>

          {contacts.phones.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <p>{contacts.email}</p>
        </div>
      </section>
    </div>
  );
};

export default Hotels;
