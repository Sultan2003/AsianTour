import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import styles from "./hotels.module.scss";

const BASE_URL = "https://brilliant-passion-7d3870e44b.strapiapp.com/api";

const RoomCard = ({ room, styles }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleMouseMove = (e) => {
    if (!room.images?.length) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - left;

    const sectionWidth = width / room.images.length;

    const index = Math.min(
      room.images.length - 1,
      Math.floor(x / sectionWidth),
    );

    setCurrentImage(index);
  };

  return (
    <div className={styles.card}>
      {room.images?.length > 0 && (
        <div className={styles.roomSlider} onMouseMove={handleMouseMove}>
          <img src={room.images[currentImage]} alt={room.title} />

          {room.images.length > 1 && (
            <div className={styles.lines}>
              {room.images.map((_, idx) => (
                <span
                  key={idx}
                  className={idx === currentImage ? styles.activeLine : ""}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.cardContent}>
        <h3>{room.title}</h3>

        {room.description && (
          <p>
            {room.description
              .split(/(?=Size:)/)
              .filter(Boolean)[0]
              .trim()}
          </p>
        )}
        {room.price && <span>{room.price}</span>}
      </div>
    </div>
  );
};

const Hotels = () => {
  const [hotel, setHotel] = useState(null);

  const [openGallery, setOpenGallery] = useState(false);

  const [galleryIndex, setGalleryIndex] = useState(0);

  const { slug } = useParams();

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(
        `${BASE_URL}/hotelss?filters[slug][$eq]=${encodeURIComponent(
          slug,
        )}&populate=*`,
      );

      const data = await res.json();

      if (data?.data?.length > 0) {
        setHotel(data.data[0]);
      }
    };

    fetchHotel();
  }, [slug]);

  if (!hotel) return <div>Loading...</div>;

  const attributes = hotel;

  const gallery = attributes.gallery || [];

  const getText = (children) =>
    children?.map((c) => c.text || c.url || "").join("");

  const getBlocksText = (blocks) =>
    blocks?.map((b) => getText(b.children)).join("\n") || "";

  const descriptionText = getBlocksText(attributes.description);

  const parseRooms = (blocks) => {
    if (!blocks) return [];

    const text = getBlocksText(blocks)
      .replace(/\s+#ROOM/g, "\n#ROOM")
      .replace(/\s+#IMAGE/g, "\n#IMAGE")
      .replace(/\s+#PRICE/g, "\n#PRICE");

    const raw = text.split("#ROOM").filter(Boolean);

    return raw.map((section) => {
      const lines = section
        .replace(/#IMAGE/g, "\n#IMAGE\n")
        .replace(/#PRICE/g, "\n#PRICE\n")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && l !== "Drag" && l !== "#" && l !== "undefined");

      let room = {
        title: "",
        description: "",
        price: "",
        images: [],
      };

      let mode = "description";

      lines.forEach((line) => {
        if (line === "#PRICE") {
          mode = "price";
          return;
        }

        if (line === "#IMAGE") {
          mode = "image";
          return;
        }

        if (!room.title) {
          room.title = line;
          return;
        }

        const urls = line.match(/https?:\/\/[^\s]+/g) || [];

        if (urls.length > 0) {
          room.images.push(...urls);

          line = line.replace(/https?:\/\/[^\s]+/g, "").trim();
        }

        if (!line) return;

        if (mode === "price") {
          room.price = line;
        } else {
          room.description += `${line} `;
        }
      });

      room.description = room.description.trim();

      return room;
    });
  };

  const rooms = parseRooms(attributes.rooms);

  const parseContacts = (blocks) => {
    if (!blocks)
      return {
        address: "",
        phones: [],
        email: "",
      };

    const text = getBlocksText(blocks);

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const res = {
      address: "",
      phones: [],
      email: "",
    };

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

  const parseTerms = (blocks) => {
    if (!blocks) return [];

    const text = getBlocksText(blocks);

    return text
      .split("#TERM")
      .map((t) => t.trim())
      .filter(Boolean);
  };

  const terms = parseTerms(attributes.termsOfStay);

  return (
    <div className={styles.page}>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryWrapper}>
          <div
            className={styles.mainImage}
            onClick={() => {
              setGalleryIndex(0);
              setOpenGallery(true);
            }}
          >
            {gallery[0] && <img src={gallery[0].url} alt="" />}
          </div>

          <div className={styles.sideImages}>
            {gallery.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className={styles.smallImage}
                onClick={() => {
                  setGalleryIndex(i + 1);
                  setOpenGallery(true);
                }}
              >
                <img src={img.url} alt="" />

                {i === 3 && gallery.length > 5 && (
                  <div className={styles.moreOverlay}>
                    +{gallery.length - 5}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={openGallery}
        close={() => setOpenGallery(false)}
        index={galleryIndex}
        slides={gallery.map((img) => ({
          src: img.url,
        }))}
      />

      <section className={styles.section}>
        <h1>{attributes.title}</h1>

        <div className={styles.about}>
          {attributes.mainImage && (
            <img src={attributes.mainImage.url} alt="" />
          )}

          <div>
            <p>{descriptionText}</p>
          </div>
        </div>
      </section>

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

      <section className={styles.section}>
        <h2>Rooms</h2>

        <div className={styles.rooms}>
          {rooms.map((room, i) => (
            <RoomCard key={i} room={room} styles={styles} />
          ))}
        </div>
      </section>

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
