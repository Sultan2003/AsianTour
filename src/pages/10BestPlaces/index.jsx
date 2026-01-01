import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./10BestPLaces.module.scss";

/* ===== Best Places Images ===== */
import registan from "../../assets/images/10-Places/Registan Square (Samarkand).jpg";
import shahi from "../../assets/images/10-Places/Shah-i-Zinda Necropolis(Samarkand).jpg";
import ark from "../../assets/images/10-Places/Ark Fortress (Bukhara).jpg";
import lyabi from "../../assets/images/10-Places/Lyabi-Hauz Ensemble (Bukhara).jpg";
import itchan from "../../assets/images/10-Places/Itchan Kala (Khiva Inner Fortress).jpg";
import kalta from "../../assets/images/10-Places/Kalta-Minor Minaret (Khiva).jpg";
import chorsu from "../../assets/images/10-Places/Chorsu Bazaar (Tashkent).jpg";
import hazrati from "../../assets/images/10-Places/Hazrati Imam Complex (Tashkent).jpg";
import aral from "../../assets/images/10-Places/Lyabi-Hauz Ensemble (Bukhara) (2).jpg";
import tashkent from "../../assets/images/10-Places/Tashkent North Railway Station (Severny Vokzal).jpg";
import img1 from "../../assets/images/10-Places/1.jpg";
import img2 from "../../assets/images/10-Places/2.jpg";

export default function PlacestoVisit() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const uzbekistanTours = tours.filter((t) => t.location === "Uzbekistan");
  const [images, setImages] = useState([]);

  const getTourImage = (tour) => {
    const match = images.find((img) => img.alternativeText === tour.title);
    return match?.url || "https://via.placeholder.com/400x400";
  };
  const LINK_WORDS = [
    // ✅ Main pages
    { word: "Home", url: "/" },
    { word: "About Us", url: "/about" },
    { word: "Contact", url: "/contact" },
    { word: "Search", url: "/search" },
    { word: "Visa Policy", url: "/visa-policy" },
    { word: "Transfers", url: "/Asian-Tour-Transfer" },

    // ✅ Country tours
    { word: "Uzbekistan Tours", url: "/Uzbek-Tours" },
    { word: "Kazakhstan Tours", url: "/Kazakh-Tours" },
    { word: "Kyrgyzstan Tours", url: "/Kyrgyz-Tours" },
    { word: "Tajikistan Tours", url: "/Tajik-Tours" },
    { word: "Turkmenistan Tours", url: "/Turkmen-Tours" },
    { word: "Central Asia Tours", url: "/Central-Asia-Tours" },
    { word: "Silk Road Tours", url: "/Silk-Road-Tours" },
    { word: "Caucasus Tours", url: "/Caucas-Tours" },
    { word: "Armenia Tours", url: "/Armenia-Tours" },
    { word: "Azerbaijan Tours", url: "/Azerbaijan-Tours" },
    { word: "Georgia Tours", url: "/Georgia-Tours" },

    // ✅ Destinations (country pages)
    { word: "Uzbekistan", url: "/Uzbekistan" },
    { word: "Kazakhstan", url: "/Kazakhstan" },
    { word: "Kyrgyzstan", url: "/Kyrgyzstan" },
    { word: "Tajikistan", url: "/Tajikistan" },
    { word: "Turkmenistan", url: "/Turkmenistan" },
    { word: "Central Asia", url: "/Central-Asia" },
    { word: "Silk Road", url: "/Silk-Road" },
    { word: "Caucasus", url: "/Caucasus" },
    { word: "Armenia", url: "/Armenia" },
    { word: "Azerbaijan", url: "/Azerbaijan" },
    { word: "Georgia", url: "/Georgia" },

    // ✅ City pages
    { word: "Tashkent", url: "/Uzbekistan-Tashkent" },
    { word: "Samarkand", url: "/Uzbekistan-Samarkand" },
    { word: "Bukhara", url: "/Uzbekistan-Bukhara" },
    { word: "Khiva", url: "/Uzbekistan-Khiva" },
    { word: "Astana", url: "/Kazakhstan-Astana" },
    { word: "Almaty", url: "/Kazakhstan-Almaty" },
    { word: "Bishkek", url: "/Kyrgyzstan-Bishkek" },
    { word: "Tbilisi", url: "/Georgia-Tbilisi" },

    // ✅ Tour types
    { word: "City Tours", url: "/City-Tours" },
    { word: "Cultural Tours", url: "/Cultural-Tours" },
    { word: "Gastronomy Tours", url: "/Gastronomy-Tours" },
    { word: "Religious Tours", url: "/Religious-Tours" },
    { word: "Eco Tours", url: "/Eco-Tours" },
    { word: "Business Tours", url: "/Business-Mice-Tours" },

    // ✅ Private tours
    { word: "Uzbekistan Private Tours", url: "/Uzbekistan-Private-Tours" },
    { word: "Kazakhstan Private Tours", url: "/Kazakhstan-Private-Tours" },
    { word: "Silk Road Private Tours", url: "/Silk-Road-Private-Tours" },
    { word: "Central Asia Private Tours", url: "/Central-Asia-Private-Tours" },
    { word: "Kyrgyzstan Private Tours", url: "/Kyrgyzstan-Private-Tours" },
    { word: "Tajikistan Private Tours", url: "/Tajikistan-Private-Tours" },
    { word: "Turkmenistan Private Tours", url: "/Turkmenistan-Private-Tours" },
    { word: "Armenia Private Tours", url: "/Armenia-Private-Tours" },
    { word: "Azerbaijan Private Tours", url: "/Azerbaijan-Private-Tours" },
    { word: "Georgia Private Tours", url: "/Georgia-Private-Tours" },
    { word: "Caucasus Private Tours", url: "/Caucasus-Private-Tours" },
  ];

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const processTextInline = (text) => {
    if (!text) return text;

    let parts = [text];

    // 🔥 longest phrases first (VERY important)
    const sortedLinks = [...LINK_WORDS].sort(
      (a, b) => b.word.length - a.word.length
    );

    sortedLinks.forEach(({ word, url }) => {
      const regex = new RegExp(`\\b(${escapeRegex(word)})\\b`, "gi");

      parts = parts.flatMap((part, i) => {
        if (typeof part !== "string") return part;

        return part.split(regex).map((chunk, idx) =>
          chunk.match(regex) ? (
            <a
              key={`${word}-${i}-${idx}`}
              href={url}
              className={styles.autoLink}
            >
              {chunk}
            </a>
          ) : (
            chunk
          )
        );
      });
    });

    return parts;
  };

  const makeSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    fetch(
      "https://brilliant-passion-7d3870e44b.strapiapp.com/api/asian-tours?filters[location][$eq]=Uzbekistan"
    )
      .then((r) => r.json())
      .then((d) => setTours(d.data || []));
  }, []);

  /* IMAGES API */
  useEffect(() => {
    fetch("https://brilliant-passion-7d3870e44b.strapiapp.com/api/upload/files")
      .then((r) => r.json())
      .then((d) => setImages(d));
  }, []);

  const bestPlaces = [
    { title: "Registan Square", image: registan, target: "registan" },
    { title: "Shah-i-Zinda", image: shahi, target: "shahi" },
    { title: "Ark Fortress", image: ark, target: "ark" },
    { title: "Lyabi-Hauz", image: lyabi, target: "lyabi" },
    { title: "Itchan Kala", image: itchan, target: "itchan" },
    { title: "Kalta-Minor", image: kalta, target: "kalta" },
    { title: "Chorsu Bazaar", image: chorsu, target: "chorsu" },
    { title: "Hazrati Imam", image: hazrati, target: "hazrati" },
    { title: "Aral Sea", image: aral, target: "aral" },
    { title: "Tashkent City", image: tashkent, target: "tashkent" },

    { title: "", image: img1 },
    { title: "", image: img2 },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* ================= LEFT ================= */}
          <div className={styles.tours}>
            {/* ================= BEST PLACES GRID ================= */}
            <section className={styles.placesSection}>
              <h2>10 Best Places to Visit in Uzbekistan</h2>

              <div className={styles.placesGrid}>
                {bestPlaces.map((p, i) => (
                  <a
                    key={i}
                    href={p.target ? `#${p.target}` : undefined}
                    className={`${styles.placeCard} ${
                      !p.target ? styles.disabled : ""
                    }`}
                  >
                    <img src={p.image} alt={p.title} />
                    {p.title && (
                      <span className={styles.placeLabel}>{p.title}</span>
                    )}
                  </a>
                ))}
              </div>
            </section>

            <section id="registan" className={styles.placeText}>
              <h3>Registan Square (Samarkand)</h3>
              <p>
                {processTextInline(`
                Registan Square is the historical and architectural heart of
                Samarkand and one of the most iconic landmarks of Uzbekistan. It
                is recognized as a UNESCO World Heritage Site as part of the
                “Samarkand – Crossroad of Cultures” ensemble. The square is
                formed by three grand madrasahs: Ulugh Beg Madrasah, Sher-Dor
                Madrasah, and Tilla-Kari Madrasah. The Ulugh Beg Madrasah, built
                in the 15th century, served as a major center of science and
                education during the Timurid era. The Sher-Dor Madrasah,
                constructed in the 17th century, is known for its unique portal
                decorated with sun-faced lions. The Tilla-Kari Madrasah features
                a richly gilded mosque, considered one of the finest examples of
                Islamic interior decoration in Central Asia. Historically,
                Registan served as the main public square of Samarkand, where
                trade, celebrations, decrees, and public gatherings took place.
                The square was a central hub of the Silk Road network. Today, it
                attracts millions of visitors from around the world. The
                ensemble is admired for its exceptional symmetry, tilework, and
                architectural harmony. Each madrasah showcases a different
                historical period and decorative style. In the evenings, the
                Registan hosts an impressive light-and-sound show. Preservation
                efforts continue to maintain the complex’s structural and
                artistic integrity. Registan remains the most photographed site
                in Uzbekistan. It stands as a symbol of the country’s cultural
                heritage and historical importance.   `)}
              </p>
            </section>

            <section id="shahi" className={styles.placeText}>
              <h3>Shah-i-Zinda Necropolis</h3>
              <p>
                {processTextInline(`
                Shah-i-Zinda is one of the most important religious and
                architectural complexes in Uzbekistan. It is located on the
                northern slope of ancient Afrasiab in Samarkand. The necropolis
                consists of a series of mausoleums dating from the 11th to the
                19th centuries. The name “Shah-i-Zinda” means “The Living King,”
                referring to the legend of Kusam ibn Abbas, a cousin of the
                Prophet Muhammad, who is believed to be buried here. The site is
                considered one of the holiest places in the region. The
                mausoleums are renowned for their extraordinary blue tilework,
                mosaics, and majolica. Each tomb features unique decorative
                patterns reflecting different historical periods. Shah-i-Zinda
                provides a rare example of continuous architectural development
                over nearly 1,000 years. The complex is a UNESCO World Heritage
                Site as part of Samarkand’s cultural zone. It has long been a
                place of pilgrimage for Muslims from Central Asia and beyond.
                The narrow corridors and stairways create a distinctive sacred
                atmosphere. Restoration projects have helped preserve the
                original beauty of the domes and façades. The ensemble is one of
                the most photographed sites in Samarkand. Shah-i-Zinda
                represents the pinnacle of Timurid decorative art. It remains an
                important symbol of spiritual and architectural heritage.`)}
              </p>
            </section>

            <section id="ark" className={styles.placeText}>
              <h3>Ark Fortress (Bukhara)</h3>
              <p>
                {processTextInline(`
                The Ark Fortress is the oldest surviving structure in Bukhara
                and one of the most significant monuments of Uzbekistan. It
                served as the residence of Bukhara’s emirs for nearly a thousand
                years. The fortress is situated on an artificial hill that has
                been continuously occupied since the 4th or 5th century CE.
                Throughout history, the Ark functioned as a royal palace,
                administrative center, and military stronghold. It housed
                government offices, stables, workshops, and living quarters. The
                main gate, known as the Western Portal, leads to a ramp that
                ascends into the fortress. Inside, visitors can explore several
                museums dedicated to Bukhara’s history, culture, and royal
                traditions. The Ark also contains the remnants of the emir’s
                mosque and reception halls. The fortress played a central role
                in the region’s political affairs, especially during the Emirate
                of Bukhara. It was partially destroyed during the Russian
                conquest in 1920. Today, conservation efforts aim to preserve
                what remains of the original complex. The Ark offers panoramic
                views of Bukhara’s old city. It is one of the most frequently
                visited attractions in Bukhara. The site stands as a symbol of
                the city’s ancient power and historical legacy. `)}
              </p>
            </section>

            <section id="lyabi" className={styles.placeText}>
              <h3>Lyabi-Hauz Ensemble</h3>
              <p>
                {processTextInline(`
                Lyabi-Hauz is one of the most famous architectural complexes in
                Bukhara and a central gathering place in the old city. The
                ensemble is built around a traditional reservoir, which
                historically served as a water supply for the population. The
                name “Lyabi-Hauz” means “by the pond.” The complex consists of
                three main structures: Kukeldash Madrasah, Nadir Divan-Beggi
                Khanqah, and Nadir Divan-Beggi Madrasah. The Kukeldash Madrasah,
                constructed in the 16th century, is one of the largest in
                Central Asia. The nearby khanqah was originally intended for
                Sufi gatherings and spiritual instruction. The Nadir Divan-Beggi
                Madrasah features distinctive bird motifs on its façade, which
                are unusual in Islamic architecture. Lyabi-Hauz has long been a
                social and commercial center of Bukhara. The surrounding area
                includes traditional tea houses, restaurants, and market stalls.
                The pond itself is shaded by centuries-old mulberry trees.
                Historically, reservoirs like Lyabi-Hauz were essential elements
                of urban design in Bukhara. The complex has been carefully
                restored to maintain its historical character. Today, it is a
                popular place for cultural events and evening strolls.
                Lyabi-Hauz remains a symbol of the city’s traditional atmosphere
                and architectural charm `)}
              </p>
            </section>

            <section id="itchan" className={styles.placeText}>
              <h3>Itchan Kala (Khiva)</h3>
              <p>
                {processTextInline(`
                Lyabi-Hauz is one of the most famous architectural complexes in
                Bukhara and a central gathering place in the old city. The
                ensemble is built around a traditional reservoir, which
                historically served as a water supply for the population. The
                name “Lyabi-Hauz” means “by the pond.” The complex consists of
                three main structures: Kukeldash Madrasah, Nadir Divan-Beggi
                Khanqah, and Nadir Divan-Beggi Madrasah. The Kukeldash Madrasah,
                constructed in the 16th century, is one of the largest in
                Central Asia. The nearby khanqah was originally intended for
                Sufi gatherings and spiritual instruction. The Nadir Divan-Beggi
                Madrasah features distinctive bird motifs on its façade, which
                are unusual in Islamic architecture. Lyabi-Hauz has long been a
                social and commercial center of Bukhara. The surrounding area
                includes traditional tea houses, restaurants, and market stalls.
                The pond itself is shaded by centuries-old mulberry trees.
                Historically, reservoirs like Lyabi-Hauz were essential elements
                of urban design in Bukhara. The complex has been carefully
                restored to maintain its historical character. Today, it is a
                popular place for cultural events and evening strolls.
                Lyabi-Hauz remains a symbol of the city’s traditional atmosphere
                and architectural charm. `)}
              </p>
            </section>

            <section id="kalta" className={styles.placeText}>
              <h3>Kalta-Minor Minaret</h3>
              <p>
                {processTextInline(`
                The Kalta-Minor Minaret is one of the most recognizable symbols
                of Khiva. Its name means “Short Minaret,” referring to its
                unfinished height. Construction began in 1851 under Muhammad
                Amin Khan, who intended it to be the tallest minaret in Central
                Asia. However, the project was abandoned after the khan’s death
                in 1855. Despite being unfinished, Kalta-Minor is famous for its
                unique cylindrical shape. The minaret is completely covered in
                glazed blue, green, and turquoise tiles, making it stand out
                among Khiva’s architecture. Its vivid color patterns remain
                exceptionally well preserved. The minaret stands at the entrance
                of the Muhammad Amin Khan Madrasah. Historically, it was
                intended to serve both religious and defensive purposes.
                According to local legend, the khan wanted the minaret to be
                high enough to see Bukhara from Khiva. Today, Kalta-Minor is one
                of the most photographed monuments in Uzbekistan. It symbolizes
                the artistic excellence of 19th-century Khiva craftsmanship. The
                minaret plays a central role in the visual identity of Itchan
                Kala. It remains a highlight of city tours and cultural events.
                Its charm lies in its beauty rather than its height, making it
                an unforgettable landmark for visitors. `)}
              </p>
            </section>

            <section id="chorsu" className={styles.placeText}>
              <h3>Chorsu Bazaar</h3>
              <p>
                {processTextInline(`
                Chorsu Bazaar is the largest and most historic marketplace in
                Tashkent. It has served as a major trading hub of the region for
                centuries. The modern bazaar is distinguished by its large blue
                dome, which houses a wide variety of local products. Chorsu is
                located in the heart of the Old City, near several important
                cultural sites. The market offers fresh produce, spices, dried
                fruits, traditional bread, and handcrafted goods. It is a
                vibrant example of Uzbek daily life and hospitality. The bazaar
                is especially famous for its rich selection of nuts, saffron,
                and halal meats. Surrounding streets host additional stalls, tea
                houses, and artisan workshops. Historically, Chorsu was part of
                the ancient Silk Road trade network. The bazaar’s architecture
                combines Soviet-era design with traditional elements. It is a
                popular destination for both locals and tourists. Chorsu Bazaar
                is also known for its colorful atmosphere and friendly vendors.
                Food courts within the market serve traditional Uzbek dishes
                such as plov and shashlik. The site continues to play a central
                role in Tashkent’s cultural and commercial life. It remains one
                of the most visited public spaces in the capital. `)}
              </p>
            </section>

            <section id="hazrati" className={styles.placeText}>
              <h3>Hazrati Imam Complex</h3>
              <p>
                {processTextInline(`
                The Hazrati Imam Complex is the main religious center of
                Tashkent and one of the most important Islamic sites in
                Uzbekistan. It is located in the Old City district. The complex
                includes several key structures: the Barak-Khan Madrasah,
                Tilla-Sheikh Mosque, Muyi Muborak Library, and the Hazrati Imam
                Mausoleum. The complex is especially famous for housing the
                Uthman Qur’an, believed to be one of the oldest surviving
                Qur’ans in the world. The manuscript is preserved inside a
                special vault within the library. Hazrati Imam has been a place
                of theological education and pilgrimage for centuries. The
                architecture reflects traditional Central Asian design with
                lavish tilework and elegant domes. The spacious courtyards
                create a serene and spiritual atmosphere. The complex underwent
                major restoration after the 1966 Tashkent earthquake. Today, it
                functions as an active mosque and cultural center. Visitors come
                to learn about Islamic history and admire the artistic
                craftsmanship. The site plays a central role in religious events
                and national ceremonies. It is regarded as the most sacred
                location in Tashkent. Hazrati Imam remains a symbol of the
                city’s spiritual heritage. `)}
              </p>
            </section>

            <section id="aral" className={styles.placeText}>
              <h3>Aral Sea & Moynaq</h3>
              <p>
                {processTextInline(`
                The Aral Sea is one of the world’s most significant
                environmental sites and a symbol of ecological change. Once the
                fourth-largest lake on Earth, it dramatically shrank during the
                20th century due to irrigation projects. The former port town of
                Moynaq now stands many kilometers away from the remaining
                shoreline. The most famous site is the Ship Cemetery, where
                abandoned fishing vessels rest on the dry seabed. These ships
                illustrate the scale of the environmental disaster. The Aral Sea
                region is also home to a museum that documents the history of
                the sea and local communities. Scientific expeditions continue
                to study the ecosystem and desertification. Efforts to restore
                parts of the Northern Aral Sea have had partial success. The
                area attracts visitors interested in environmental tourism and
                photography. The landscape consists of desert plains, salt
                flats, and former seabeds. Local populations have adapted to new
                economic conditions after the decline of fishing. The region is
                an important case study in global water management. Tours to
                Moynaq often include visits to nearby historical and natural
                sites. The Aral Sea remains a powerful reminder of human impact
                on the environment. It stands as a unique destination for
                educational and adventure travel. `)}
              </p>
            </section>

            <section id="tashkent" className={styles.placeText}>
              <h3>Tashkent City</h3>
              <p>
                {processTextInline(`
                Tashkent North Railway Station is one of the main transportation
                hubs of the capital. It serves domestic routes and connects
                Tashkent with major cities across Uzbekistan. The station is
                known for its modern architecture and organized infrastructure.
                It plays a crucial role in operating high-speed Afrosiyob trains
                to Samarkand, Bukhara, and Khiva. The facility includes ticket
                halls, waiting rooms, information centers, and passenger
                services. The station provides accessible transportation options
                for both local residents and international travelers. Security
                and safety standards are maintained at a high level. The station
                area is well connected to public transport, including metro and
                taxi services. Historically, the railway has been central to the
                development of Uzbekistan’s transportation system. Tashkent
                North Station helps facilitate large numbers of visitors
                traveling for tourism, business, and regional transit. It also
                supports cargo and logistical operations. Renovations have
                improved the building’s functionality and appearance in recent
                years. Clear navigation signs are provided in Uzbek, Russian,
                and English. The station is known for its punctual service and
                efficient management. It remains an essential part of
                Uzbekistan’s railway network. `)}
              </p>
            </section>
          </div>
          {/* ================= RIGHT ================= */}
          <div className={styles.right}>
            {uzbekistanTours.map((tour) => (
              <div
                key={tour.id}
                className={styles.tourCard}
                onClick={() => navigate(`/tour/${makeSlug(tour.title)}`)}
              >
                <img
                  src={getTourImage(tour)}
                  className={styles.tourImage}
                  loading="lazy"
                  alt={tour.title}
                />
                <div className={styles.tourInfo}>
                  <h3>{tour.title}</h3>
                  <p>
                    {tour.startDate &&
                      new Date(tour.startDate).toLocaleDateString()}
                  </p>
                  <p className={styles.price}>from ${tour.price || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
