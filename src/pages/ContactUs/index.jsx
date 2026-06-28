import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import styles from "./ContactUs.module.scss";

const translations = {
  en: {
    breadcrumbHome: "Home",
    title: "Contact GoToCentralAsia",
    intro: "We are glad to answer and assist, please send us your questions or queries.",
    placeholders: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      comments: "Your comments",
    },
    submit: "Contact us",
    walkInTitle: "Walk-in Guests",
    walkInText:
      "As our tour operators are busy working on ongoing tours and existing customer requests, it might be difficult for us to accommodate walk-in travelers on the spot. For a timely response that responds to your specific requests, we highly recommend that you email us. We aim to provide an initial response to all email queries within 2 working days.",
    success: "✅ Your message has been sent successfully!",
    failure: "❌ Failed to send message. Please try again.",
    emptyComments: "None",
  },
  ru: {
    breadcrumbHome: "Главная",
    title: "Связаться с GoToCentralAsia",
    intro: "Мы с радостью ответим на ваши вопросы и поможем с запросами.",
    placeholders: {
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Электронная почта",
      comments: "Ваш комментарий",
    },
    submit: "Связаться с нами",
    walkInTitle: "Гости без предварительной записи",
    walkInText:
      "Наши туроператоры часто заняты текущими турами и заявками клиентов, поэтому нам может быть сложно сразу принять гостей без предварительной записи. Для своевременного ответа на ваш конкретный запрос рекомендуем написать нам по электронной почте. Мы стараемся отвечать на все письма в течение 2 рабочих дней.",
    success: "✅ Ваше сообщение успешно отправлено!",
    failure: "❌ Не удалось отправить сообщение. Пожалуйста, попробуйте ещё раз.",
    emptyComments: "Нет",
  },
};

const titles = ["Mr.", "Ms.", "Mrs.", "Dr."];

const ContactUs = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang] || translations.en;
  const [formData, setFormData] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = `
📩 *New Contact Request*
🏷️ Title: ${formData.title}
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email}
💬 Comments: ${formData.comments || t.emptyComments}
`;

    try {
      await fetch(
        `https://api.telegram.org/bot7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1003082651864",
            text: message,
            parse_mode: "Markdown",
          }),
        },
      );

      alert(t.success);
      setFormData({
        title: "Mr.",
        firstName: "",
        lastName: "",
        email: "",
        comments: "",
      });
    } catch (err) {
      console.error(err);
      alert(t.failure);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <a href="/">{t.breadcrumbHome}</a> / <span>{t.title}</span>
      </nav>
      <h1 className={styles.heading}>{t.title}</h1>
      <p className={styles.subheading}>{t.intro}</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.select}
          >
            {titles.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </select>
          <input
            name="firstName"
            type="text"
            placeholder={t.placeholders.firstName}
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <input
          name="lastName"
          type="text"
          placeholder={t.placeholders.lastName}
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          name="email"
          type="email"
          placeholder={t.placeholders.email}
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <textarea
          name="comments"
          placeholder={t.placeholders.comments}
          value={formData.comments}
          onChange={handleChange}
          className={styles.textarea}
        />

        <button type="submit" className={styles.button}>
          {t.submit}
        </button>
      </form>

      <section className={styles.walkInSection}>
        <h2>{t.walkInTitle}</h2>
        <p>{t.walkInText}</p>
      </section>
    </div>
  );
};

export default ContactUs;
