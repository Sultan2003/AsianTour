import { useContext, useState } from "react";
import styles from "./AboutUs.module.scss";

import kamola from "../../assets/stuff/1.png";
import sherzod from "../../assets/stuff/2.png";
import alisher from "../../assets/stuff/3.png";
import dinara from "../../assets/stuff/4.png";
import sultanbek from "../../assets/stuff/sultanbek.PNG";
import abdurashid from "../../assets/stuff/abdurashid.jpg";
import sardorbek from "../../assets/stuff/sardorbek.jpg";
import { LanguageContext } from "../../context/LanguageContext";

const translations = {
  en: {
    metaTitle: "About Go To Central Asia | Tour Operator Team & Company",
    metaDescription:
      "Learn about Go To Central Asia and Miramax Travel Management team. Meet travel experts, consultants and software specialists behind Central Asia tours.",
    tabs: { about: "About Us", team: "Our Team" },
    aboutTitle: "About Us",
    aboutParagraphs: [
      "Gotocentralasia.com is a project by Miramax Travel Management, a distinct and well-known travel agency in Uzbekistan. Since 2003, it has been successfully offering travelers various services under inbound and outbound tourism.",
      "The main goal of the project is to offer and share cultural experiences of the local people of Central Asia and the Caucasus with the world.",
      "For generations, Central Asia and the Caucasus remained untouched by mainstream travelers. Once-famous cities and people who played major roles in world history were unknown to the public and undeservedly forgotten.",
      "We would love to share our ancient history, unique culture, and old traditions with you. We invite you to be part of this journey through centuries and experience it for yourself.",
    ],
    teamParagraphs: {},
    positions: {
      sherzod: "Co-Founder and Director of Miramax Travel Management",
      alisher:
        "Co-Founder and Corporate Sales Manager of Miramax Travel Management",
      kamola: "Senior Travel Manager",
      dinara: "Consultant on ECO and Medical Travel",
      sultanbek: "Lead Software Specialist",
      sardorbek: "Travel Assistant",
      abdurashid: "Travel Assistant",
    },
  },
  ru: {
    metaTitle: "О Go To Central Asia | Команда и туристическая компания",
    metaDescription:
      "Узнайте о Go To Central Asia и команде Miramax Travel Management. Познакомьтесь с экспертами по путешествиям, консультантами и специалистами, которые создают туры по Центральной Азии.",
    tabs: { about: "О нас", team: "Наша команда" },
    aboutTitle: "О нас",
    aboutParagraphs: [
      "Gotocentralasia.com — проект Miramax Travel Management, известного туристического агентства в Узбекистане. С 2003 года компания успешно предоставляет путешественникам различные услуги в сфере въездного и выездного туризма.",
      "Главная цель проекта — знакомить мир с культурным опытом, традициями и образом жизни народов Центральной Азии и Кавказа.",
      "На протяжении поколений Центральная Азия и Кавказ оставались вне массового туристического внимания. Некогда знаменитые города и люди, сыгравшие важную роль в мировой истории, были мало известны широкой публике и незаслуженно забыты.",
      "Мы хотим поделиться с вами нашей древней историей, уникальной культурой и старыми традициями. Приглашаем вас стать частью этого путешествия сквозь века и прочувствовать его лично.",
    ],
    teamParagraphs: {
      sherzod: [
        "Выпускник финансового факультета, Шерзод имеет многолетний опыт в корпоративном бизнесе. Он начал свою карьеру в международной компании в Узбекистане, затем долго жил в Европе. Он также принимал участие в международных и местных строительных проектах. Всё это помогло ему развить уникальные навыки организации людей и руководства ими для достижения новых целей.",
        "С 2011 года Шерзод присоединился к Miramax Travel Management как сооснователь и менеджер по развитию бизнеса. С 2017 года он является директором компании и отвечает за общее управление.",
      ],
      alisher: [
        "Окончив Институт востоковедения, Алишер прожил в Турции несколько лет. Позже, вернувшись домой, он присоединился к международной компании и отвечал за административные вопросы.",
        "Будучи сооснователем с 2003 года, Алишер заложил прочный фундамент компании и продолжает управлять её продажами и корпоративными отношениями.",
        "Он увлечён путешествиями и любит открывать для себя новые направления.",
      ],
      kamola: [
        "Камола окончила Ташкентский государственный экономический университет в 2012 году, факультет международных туристических услуг. В 2014 году она присоединилась к Miramax Travel Management как менеджер по продажам — консультант. С тех пор Камола установила прочную связь с компанией и стала неотъемлемым членом команды.",
        "Годы в туристической отрасли сделали её настоящим профессионалом и преданным специалистом по путешествиям по всему миру.",
        "Камола сама также любит путешествовать и открывать новые места на карте.",
      ],
      dinara: [
        "Окончив Ташкентский государственный экономический университет, Динара присоединилась к Miramax Travel Management в 2014 году.",
        "Как отличный командный игрок, Динара помогала открывать и развивать новые международные направления, а также местные места, достойные путешествий.",
        "Динара любит свою семью и посвящает ей всё свободное время. Для неё лучшее путешествие — это семейное путешествие.",
      ],
      sultanbek: [
        "Выпускник направления программной инженерии, Султанбек имеет профессиональный опыт как в HR, так и в разработке программного обеспечения.",
        "Он работал в HR-отделе New Uzbekistan University, где успешно выполнил различные проекты, включая создание веб-сайтов и поддержку внутренних цифровых процессов.",
        "Имея два года опыта во фронтенд-разработке и практические навыки бэкенда, сейчас он работает в Miramax Travel Management ведущим специалистом по программному обеспечению, внося вклад в современные веб-системы и разработку платформ.",
        "Наряду с профессиональной деятельностью он в настоящее время получает степень магистра по Data Science and Economics, укрепляя свою экспертизу в аналитике и принятии решений на основе данных.",
      ],
      sardorbek: [
        "Сардорбек окончил Ташкентский государственный транспортный университет по специальности авиадиспетчер и имеет сильную базу в авиации и операционной координации.",
        "Он присоединился к Miramax Travel Management в конце 2025 года, привнеся аналитическое мышление, внимание к деталям и структурированный подход к планированию путешествий и обслуживанию клиентов.",
        "Он работает ассистентом по путешествиям, поддерживая координацию поездок и обслуживание клиентов.",
        "Имея сильный интерес к авиации и путешествиям, Сардорбек стремится создавать комфортные, хорошо организованные поездки и предоставлять клиентам надёжный туристический опыт.",
      ],
      abdurashid: [
        "Абдурашид окончил Ташкентский университет информационных технологий в 2025 году, факультет компьютерной инженерии.",
        "Он работает ассистентом по путешествиям в Miramax Travel Management, поддерживая ежедневные операции и помогая обеспечивать плавную координацию туров, услуг и запросов клиентов.",
        "Благодаря структурированному и внимательному к деталям мышлению он способствует эффективной коммуникации между командой, партнёрами и путешественниками, помогая предоставлять надёжный туристический опыт по Центральной Азии.",
      ],
    },
    positions: {
      sherzod: "Сооснователь и директор Miramax Travel Management",
      alisher:
        "Сооснователь и менеджер по корпоративным продажам Miramax Travel Management",
      kamola: "Старший менеджер по туризму",
      dinara: "Консультант по ECO и медицинскому туризму",
      sultanbek: "Ведущий специалист по программному обеспечению",
      sardorbek: "Ассистент по путешествиям",
      abdurashid: "Ассистент по путешествиям",
    },
  },
};
export default function AboutUs() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang] || translations.en;
  const [activeSection, setActiveSection] = useState("about");

  const showSection = (section, sectionId) => {
    setActiveSection(section);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const team = [
    {
      id: 1,
      name: "Sherzod Aliyev",
      position: t.positions.sherzod,
      image: sherzod,
      paragraphs: t.teamParagraphs.sherzod || [
        "Finance graduate, Sherzod has years of experience in corporate business. Started his career in Multinational Company in Uzbekistan, followed long life in Europe. He also took part in International and local construction projects. All these helped him to develop unique skills to organise people and lead them to achieve new goals.",
        "From 2011 Sherzod join Miramax Travel Management as a co-founder and business development manager. Since 2017 he is a Director of the Company and responsible for overall management.",
      ],
    },
    {
      id: 2,
      name: "Alisher Mirakhmedov",
      position: t.positions.alisher,
      image: alisher,
      paragraphs: t.teamParagraphs.alisher || [
        "Graduated from Institute of Oriental Studies, Alisher lived in Turkey for a couple of years. Later, once he returned home, he joined International Company and was responsible for administrative matters.",
        "Co-founder since 2003, Alisher laid strong foundation to the company and keeps managing its sales and corporate relations.",
        "Passioned for travel and loves to experience new destinations.",
      ],
    },
    {
      id: 3,
      name: "Kamola Rasuleva",
      position: t.positions.kamola,
      image: kamola,
      paragraphs: t.teamParagraphs.kamola || [
        "Kamola graduated from Tashkent University of Economics on 2012, International Tourism Services faculty. Joining Miramax Travel Management from 2014 as a sale manager – consultant. Since then Kamola grown strong bond with the Company and became inseparable member of the team.",
        "Years in tourism industry made her true professional and dedicated specialist of traveling all around the world.",
        "Kamola herself also loves traveling and open new spots in the map.",
      ],
    },
    {
      id: 4,
      name: "Dinara Galimova",
      position: t.positions.dinara,
      image: dinara,
      paragraphs: t.teamParagraphs.dinara || [
        "Graduated from Tashkent University of Economics, Dinara joined Miramax Travel Management in 2014.",
        "As an excellent team player Dinara helped to open and develop new international destinations as well as local sites worth travelling for.",
        "Dinara loves her family and dedicates all her free time to them. For her, best travel is family travel.",
      ],
    },
    {
      id: 5,
      name: "Sultanbek Erkinbaev",
      position: t.positions.sultanbek,
      image: sultanbek,
      paragraphs: t.teamParagraphs.sultanbek || [
        "Software engineering graduate, Sultanbek has professional experience in both HR and software development.",
        "He worked at New Uzbekistan University in the HR Department, where he successfully completed various projects, including building websites and supporting internal digital processes.",
        "With two years of front-end development experience and practical back-end skills, he currently works at Miramax Travel Management as a Lead Software Specialist, contributing to modern web systems and platform development.",
        "Alongside his professional work, he is currently pursuing a Master’s degree in Data Science and Economics, strengthening his expertise in analytics and data-driven decision-making.",
      ],
    },
    {
      id: 6,
      name: "Sardorbek Isakdjanov",
      position: t.positions.sardorbek,
      image: sardorbek,
      paragraphs: t.teamParagraphs.sardorbek || [
        "Graduated from Tashkent State Transport University as an Air Traffic Controller, Sardorbek has a strong background in aviation and operational coordination.",
        "He joined Miramax Travel Management at the end of 2025, bringing analytical thinking, attention to detail, and a structured approach to travel planning and client service.",
        "He works as a Travel Assistant, supporting travel coordination and client service.",
        "With a strong interest in aviation and travel, Sardorbek is passionate about creating smooth, well-organized journeys and delivering reliable travel experiences for clients.",
      ],
    },
    {
      id: 7,
      name: "Abdurashid Meliboyev",
      position: t.positions.abdurashid,
      image: abdurashid,
      paragraphs: t.teamParagraphs.abdurashid || [
        "Abdurashid graduated from Tashkent University of Information Technologies in 2025, Faculty of Computer Engineering.",
        "He works as a Travel Assistant at Miramax Travel Management, supporting daily operations and helping ensure smooth coordination of tours, services, and customer requests.",
        "With a structured and detail-oriented mindset, he contributes to efficient communication between the team, partners, and travellers, helping deliver a reliable travel experience across Central Asia.",
      ],
    },
  ];

  return (
    <>
      <div className={styles.aboutContainer}>
        {/* ===== Tabs ===== */}
        <div className={styles.tabs}>
          <button
            className={activeSection === "about" ? styles.activeTab : ""}
            onClick={() => showSection("about", "about-us")}
          >
            {t.tabs.about}
          </button>

          <button
            className={activeSection === "team" ? styles.activeTab : ""}
            onClick={() => showSection("team", "our-team")}
          >
            {t.tabs.team}
          </button>
        </div>

        {/* ===== About Section ===== */}
        <section id="about-us">
            <h1 className={styles.title}>{t.aboutTitle}</h1>

            {t.aboutParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.text}>
                {paragraph}
              </p>
            ))}
        </section>

        {/* ===== Team Section ===== */}
        <section id="our-team" className={styles.teamSection}>
            <h2 className={styles.teamTitle}>{t.tabs.team}</h2>

            <div className={styles.teamList}>
              {team.map((member) => (
                <div key={member.id} className={styles.member}>
                  <div className={styles.memberHeader}>
                    {member.name === "Sherzod Aliyev" && (
                      <div className={styles.guideLink}>
                        <a href="//needguide.net/view_guide.php?user_id=23134">
                          Гид-экскурсовод в Ташкенте Шерзод Алиев
                        </a>
                      </div>
                    )}

                    <h3>{member.name}</h3>
                    <span>{member.position}</span>
                  </div>

                  <div className={styles.memberBody}>
                    <div className={styles.photo}>
                      <img
                        src={member.image}
                        alt={
                          member.name === "Sultanbek Erkinbaev"
                            ? "Sultanbek Erkinbaev software specialist Go To Central Asia travel website developer"
                            : member.name
                        }
                      />
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
        </section>
      </div>
    </>
  );
}
