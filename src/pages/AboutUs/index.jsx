import { useState } from "react";
import styles from "./AboutUs.module.scss";

import kamola from "../../assets/stuff/1.png";
import sherzod from "../../assets/stuff/2.png";
import alisher from "../../assets/stuff/3.png";
import dinara from "../../assets/stuff/4.png";
import sultanbek from "../../assets/stuff/sultanbek.PNG";
import abdurashid from "../../assets/stuff/abdurashid.jpg";
import sardorbek from "../../assets/stuff/sardorbek.jpg";

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState("about");

  const team = [
    {
      id: 1,
      name: "Sherzod Aliyev",
      position: "Co-Founder and Director of Miramax Travel Management",
      image: sherzod,
      paragraphs: [
        "Finance graduate, Sherzod has years of experience in corporate business. Started his career in Multinational Company in Uzbekistan, followed long life in Europe. He also took part in International and local construction projects. All these helped him to develop unique skills to organise people and lead them to achieve new goals.",
        "From 2011 Sherzod join Miramax Travel Management as a co-founder and business development manager. Since 2017 he is a Director of the Company and responsible for overall management.",
      ],
    },
    {
      id: 2,
      name: "Alisher Mirakhmedov",
      position:
        "Co-Founder and Corporate Sales Manager of Miramax Travel Management",
      image: alisher,
      paragraphs: [
        "Graduated from Institute of Oriental Studies, Alisher lived in Turkey for a couple of years. Later, once he returned home, he joined International Company and was responsible for administrative matters.",
        "Co-founder since 2003, Alisher laid strong foundation to the company and keeps managing its sales and corporate relations.",
        "Passioned for travel and loves to experience new destinations.",
      ],
    },
    {
      id: 3,
      name: "Kamola Rasuleva",
      position: "Senior Travel Manager",
      image: kamola,
      paragraphs: [
        "Kamola graduated from Tashkent University of Economics on 2012, International Tourism Services faculty. Joining Miramax Travel Management from 2014 as a sale manager – consultant. Since then Kamola grown strong bond with the Company and became inseparable member of the team.",
        "Years in tourism industry made her true professional and dedicated specialist of traveling all around the world.",
        "Kamola herself also loves traveling and open new spots in the map.",
      ],
    },
    {
      id: 4,
      name: "Dinara Galimova",
      position: "Consultant on ECO and Medical Travel",
      image: dinara,
      paragraphs: [
        "Graduated from Tashkent University of Economics, Dinara joined Miramax Travel Management in 2014.",
        "As an excellent team player Dinara helped to open and develop new international destinations as well as local sites worth travelling for.",
        "Dinara loves her family and dedicates all her free time to them. For her, best travel is family travel.",
      ],
    },
    {
      id: 5,
      name: "Sultanbek Erkinbaev",
      position: "Lead Software Specialist",
      image: sultanbek,
      paragraphs: [
        "Software engineering graduate, Sultanbek has professional experience in both HR and software development.",
        "He worked at New Uzbekistan University in the HR Department, where he successfully completed various projects, including building websites and supporting internal digital processes.",
        "With two years of front-end development experience and practical back-end skills, he currently works at Miramax Travel Management as a Lead Software Specialist, contributing to modern web systems and platform development.",
        "Alongside his professional work, he is currently pursuing a Master’s degree in Data Science and Economics, strengthening his expertise in analytics and data-driven decision-making.",
      ],
    },
    {
      id: 6,
      name: "Sardorbek Isakdjanov",
      position: "Travel Assistant",
      image: sardorbek,
      paragraphs: [
        "Graduated from Tashkent State Transport University as an Air Traffic Controller, Sardorbek has a strong background in aviation and operational coordination.",
        "He joined Miramax Travel Management at the end of 2025, bringing analytical thinking, attention to detail, and a structured approach to travel planning and client service.",
        "He works as a Travel Assistant, supporting travel coordination and client service.",
        "With a strong interest in aviation and travel, Sardorbek is passionate about creating smooth, well-organized journeys and delivering reliable travel experiences for clients.",
      ],
    },
    {
      id: 7,
      name: "Abdurashid Meliboyev",
      position: "Travel Assistant",
      image: abdurashid,
      paragraphs: [
        "Abdurashid graduated from Tashkent University of Information Technologies in 2025, Faculty of Computer Engineering.",
        "He works as a Travel Assistant at Miramax Travel Management, supporting daily operations and helping ensure smooth coordination of tours, services, and customer requests.",
        "With a structured and detail-oriented mindset, he contributes to efficient communication between the team, partners, and travellers, helping deliver a reliable travel experience across Central Asia.",
      ],
    },
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* ===== Tabs ===== */}
      <div className={styles.tabs}>
        <button
          className={activeSection === "about" ? styles.activeTab : ""}
          onClick={() => setActiveSection("about")}
        >
          About Us
        </button>

        <button
          className={activeSection === "team" ? styles.activeTab : ""}
          onClick={() => setActiveSection("team")}
        >
          Our Team
        </button>
      </div>

      {/* ===== About Section ===== */}
      {activeSection === "about" && (
        <>
          <h1 className={styles.title}>About Us</h1>

          <p className={styles.text}>
            Gotocentralasia.com is a project by Miramax Travel Management, a
            distinct and well-known travel agency in Uzbekistan. Since 2003, it
            has been successfully offering travelers various services under
            inbound and outbound tourism.
          </p>

          <p className={styles.text}>
            The main goal of the project is to offer and share cultural
            experiences of the local people of Central Asia and the Caucasus
            with the world.
          </p>

          <p className={styles.text}>
            For generations, Central Asia and the Caucasus remained untouched by
            mainstream travelers. Once-famous cities and people who played major
            roles in world history were unknown to the public and undeservedly
            forgotten.
          </p>

          <p className={styles.text}>
            We would love to share our ancient history, unique culture, and old
            traditions with you. We invite you to be part of this journey
            through centuries and experience it for yourself.
          </p>
        </>
      )}

      {/* ===== Team Section ===== */}
      {activeSection === "team" && (
        <div className={styles.teamSection}>
          <h2 className={styles.teamTitle}>Our Team</h2>

          <div className={styles.teamList}>
            {team.map((member) => (
              <div key={member.id} className={styles.member}>
                <div className={styles.memberHeader}>
                  <h3>{member.name}</h3>
                  <span>{member.position}</span>
                </div>

                <div className={styles.memberBody}>
                  <div className={styles.photo}>
                    <img src={member.image} alt={member.name} />
                  </div>

                  <div className={styles.memberText}>
                    {member.paragraphs.map((p, index) => (
                      <p key={index}>{p}</p>
                    ))}
                  </div>
                </div>

                {member.id !== team.length && (
                  <div className={styles.divider} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
