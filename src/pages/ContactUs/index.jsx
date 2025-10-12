import React, { useState } from 'react';
import styles from './ContactUs.module.scss';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
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
💬 Comments: ${formData.comments || "None"}
`;

    try {
      await fetch(
        `https://api.telegram.org/bot7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: "-1003082651864", // same chat id
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      alert("✅ Your message has been sent successfully!");
      setFormData({
        title: 'Mr.',
        firstName: '',
        lastName: '',
        email: '',
        comments: '',
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to send message. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a> / <span>Contact AsianTour</span>
      </nav>
      <h1 className={styles.heading}>Contact AsianTour</h1>
      <p className={styles.subheading}>
        We are glad to answer and assist, please send us your questions or queries.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.select}
          >
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
            <option>Dr.</option>
          </select>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <textarea
          name="comments"
          placeholder="Your comments"
          value={formData.comments}
          onChange={handleChange}
          className={styles.textarea}
        />

        <button type="submit" className={styles.button}>
          Contact us
        </button>
      </form>

      <section className={styles.walkInSection}>
        <h2>Walk-in Guests</h2>
        <p>
          As our tour operators are busy working on ongoing tours and existing
          customer requests, it might be difficult for us to accommodate
          walk-in travelers on the spot. For a timely response that responds to
          your specific requests, we highly recommend that you email us. We aim
          to provide an initial response to all email queries within 2 working
          days.
        </p>
      </section>

    
    </div>
  );
};

export default ContactUs;
