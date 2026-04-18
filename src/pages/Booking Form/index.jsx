import React, { useMemo, useState } from "react";
import styles from "./BookingForm.module.scss";

const TELEGRAM_BOT_TOKEN = "7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY";
const TELEGRAM_CHAT_ID = "-1003082651864";

const CITY_CARDS = [
  { id: "tashkent", label: "Tashkent", image: null },
  { id: "samarkand", label: "Samarkand", image: null },
  { id: "bukhara", label: "Bukhara", image: null },
  { id: "khiva", label: "Khiva", image: null },
];

const TIME_OPTIONS = [
  "Night (00:00 - 06:00)",
  "Morning (06:00 - 12:00)",
  "Day (12:00 - 18:00)",
  "Evening (18:00 - 24:00)",
  "I don't know yet",
];

const CONTACT_OPTIONS = ["Telegram", "WhatsApp", "Phone", "Email"];
const TOTAL_STEPS = 10;

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    arrivalCity: "",
    arrivalTime: "",
    dayOneExcursion: "",
    guests: "",
    totalNights: "",
    firstCityNights: "",
    firstCityMustSee: "",
    secondCity: "",
    secondCityNights: "",
    secondCityMustSee: "",
    thirdCity: "",
    thirdCityNights: "",
    thirdCityMustSee: "",
    departureCity: "",
    extraWishes: "",
    fullName: "",
    phone: "",
    email: "",
    preferredContact: "Telegram",
    agree: false,
  });

  const progressPercent = useMemo(
    () => Math.round((currentStep / TOTAL_STEPS) * 100),
    [currentStep],
  );

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.arrivalCity);
      case 2:
        return Boolean(formData.arrivalTime);
      case 3:
        return Boolean(formData.dayOneExcursion);
      case 4:
        return Boolean(formData.guests && formData.totalNights && formData.firstCityNights);
      case 5:
        return Boolean(formData.secondCity);
      case 6:
        return Boolean(formData.secondCityNights);
      case 7:
        return Boolean(formData.thirdCity);
      case 8:
        return Boolean(formData.thirdCityNights);
      case 9:
        return Boolean(formData.departureCity);
      case 10:
        return Boolean(formData.fullName && formData.phone && formData.agree);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!isStepValid()) {
      alert("Please complete required fields on this step.");
      return;
    }
    setCurrentStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const cityCard = (title, value, fieldName) => (
    <button
      type="button"
      className={`${styles.cityCard} ${value === formData[fieldName] ? styles.selected : ""}`}
      onClick={() => updateField(fieldName, value)}
    >
      <div className={styles.cityImage}>image: null</div>
      <div className={styles.cityLabel}>{title}</div>
    </button>
  );

  const sendToTelegram = async () => {
    const message = `
🧭 *New Booking Form Request*

1) Arrival city: ${formData.arrivalCity}
2) Arrival time: ${formData.arrivalTime}
3) Ready for day-1 excursion: ${formData.dayOneExcursion}
4) Guests: ${formData.guests}
5) Total nights: ${formData.totalNights}
6) First city nights: ${formData.firstCityNights}
7) First city must-see: ${formData.firstCityMustSee || "-"}
8) Second city: ${formData.secondCity} (image: null)
9) Second city nights: ${formData.secondCityNights}
10) Second city must-see: ${formData.secondCityMustSee || "-"}
11) Third city: ${formData.thirdCity} (image: null)
12) Third city nights: ${formData.thirdCityNights}
13) Third city must-see: ${formData.thirdCityMustSee || "-"}
14) Departure city: ${formData.departureCity}
15) Extra wishes: ${formData.extraWishes || "-"}

👤 Name: ${formData.fullName}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email || "-"}
💬 Preferred contact: ${formData.preferredContact}
`.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      },
    );

    if (!response.ok) throw new Error("Telegram send failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid()) {
      alert("Please fill required fields.");
      return;
    }

    setIsSending(true);
    try {
      await sendToTelegram();
      alert("✅ Request sent successfully.");
      setCurrentStep(1);
      setFormData({
        arrivalCity: "",
        arrivalTime: "",
        dayOneExcursion: "",
        guests: "",
        totalNights: "",
        firstCityNights: "",
        firstCityMustSee: "",
        secondCity: "",
        secondCityNights: "",
        secondCityMustSee: "",
        thirdCity: "",
        thirdCityNights: "",
        thirdCityMustSee: "",
        departureCity: "",
        extraWishes: "",
        fullName: "",
        phone: "",
        email: "",
        preferredContact: "Telegram",
        agree: false,
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.wizard} onSubmit={handleSubmit}>
        <div className={styles.progressBar}>
          <span style={{ width: `${progressPercent}%` }} />
        </div>

        <div className={styles.grid}>
          <section className={styles.leftPane}>
            <h1 className={styles.questionTitle}>
              {currentStep === 1 && "Which city are you flying to?"}
              {currentStep === 2 && "What time are you arriving?"}
              {currentStep === 3 && "Can you start excursion on the first day?"}
              {currentStep === 4 && "Tell us about group size and nights"}
              {currentStep === 5 && "Which city do you plan to visit next?"}
              {currentStep === 6 && "How many nights in this city?"}
              {currentStep === 7 && "Which city do you plan to visit after that?"}
              {currentStep === 8 && "How many nights in the third city?"}
              {currentStep === 9 && "Departure city and extra wishes"}
              {currentStep === 10 && "Final step: your contact details"}
            </h1>

            <div className={styles.managerCard}>
              <div className={styles.avatar}>image: null</div>
              <div>
                <strong>Julia · Manager</strong>
                <p>
                  Please complete each step. If you are not sure, choose the
                  closest option and add notes.
                </p>
              </div>
            </div>

            <p className={styles.stepLabel}>Step: {currentStep}/{TOTAL_STEPS}</p>
          </section>

          <section className={styles.rightPane}>
            {currentStep === 1 && (
              <div className={styles.cardsGrid}>
                {CITY_CARDS.map((city) => cityCard(city.label, city.label, "arrivalCity"))}
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.optionColumn}>
                {TIME_OPTIONS.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`${styles.optionButton} ${formData.arrivalTime === time ? styles.selected : ""}`}
                    onClick={() => updateField("arrivalTime", time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className={styles.optionColumn}>
                {["Yes", "No, need rest", "Not sure"].map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`${styles.optionButton} ${formData.dayOneExcursion === option ? styles.selected : ""}`}
                    onClick={() => updateField("dayOneExcursion", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div className={styles.optionColumn}>
                <label>
                  Guests count *
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={(e) => updateField("guests", e.target.value)}
                  />
                </label>
                <label>
                  Total nights for whole tour *
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.totalNights}
                    onChange={(e) => updateField("totalNights", e.target.value)}
                  />
                </label>
                <label>
                  Nights in first city *
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.firstCityNights}
                    onChange={(e) => updateField("firstCityNights", e.target.value)}
                  />
                </label>
                <label>
                  Main things to see in first city
                  <textarea
                    rows="4"
                    value={formData.firstCityMustSee}
                    onChange={(e) => updateField("firstCityMustSee", e.target.value)}
                  />
                </label>
              </div>
            )}

            {currentStep === 5 && (
              <div className={styles.cardsGrid}>
                {CITY_CARDS.map((city) => cityCard(city.label, city.label, "secondCity"))}
              </div>
            )}

            {currentStep === 6 && (
              <div className={styles.optionColumn}>
                <label>
                  Nights in second city *
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.secondCityNights}
                    onChange={(e) => updateField("secondCityNights", e.target.value)}
                  />
                </label>
                <label>
                  Main things to see in second city
                  <textarea
                    rows="5"
                    value={formData.secondCityMustSee}
                    onChange={(e) => updateField("secondCityMustSee", e.target.value)}
                  />
                </label>
              </div>
            )}

            {currentStep === 7 && (
              <div className={styles.cardsGrid}>
                {CITY_CARDS.map((city) => cityCard(city.label, city.label, "thirdCity"))}
              </div>
            )}

            {currentStep === 8 && (
              <div className={styles.optionColumn}>
                <label>
                  Nights in third city *
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.thirdCityNights}
                    onChange={(e) => updateField("thirdCityNights", e.target.value)}
                  />
                </label>
                <label>
                  Main things to see in third city
                  <textarea
                    rows="5"
                    value={formData.thirdCityMustSee}
                    onChange={(e) => updateField("thirdCityMustSee", e.target.value)}
                  />
                </label>
              </div>
            )}

            {currentStep === 9 && (
              <div className={styles.optionColumn}>
                <label>
                  From which city do you fly home? *
                  <input
                    type="text"
                    value={formData.departureCity}
                    onChange={(e) => updateField("departureCity", e.target.value)}
                    placeholder="Example: Tashkent"
                  />
                </label>
                <label>
                  Extra wishes / cities / important notes
                  <textarea
                    rows="8"
                    value={formData.extraWishes}
                    onChange={(e) => updateField("extraWishes", e.target.value)}
                  />
                </label>
              </div>
            )}

            {currentStep === 10 && (
              <div className={styles.optionColumn}>
                <label>
                  Name *
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </label>
                <label>
                  Phone *
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </label>
                <label>
                  Best contact channel
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => updateField("preferredContact", e.target.value)}
                  >
                    {CONTACT_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.agree}
                    onChange={(e) => updateField("agree", e.target.checked)}
                  />
                  I agree with personal data processing policy.
                </label>
              </div>
            )}

            <div className={styles.navButtons}>
              <button type="button" className={styles.backBtn} onClick={prevStep} disabled={currentStep === 1}>
                ← Back
              </button>

              {currentStep < TOTAL_STEPS ? (
                <button type="button" className={styles.nextBtn} onClick={nextStep}>
                  Next →
                </button>
              ) : (
                <button type="submit" className={styles.nextBtn} disabled={isSending}>
                  {isSending ? "Sending..." : "Send booking request"}
                </button>
              )}
            </div>
          </section>
        </div>
      </form>
    </main>
  );
};

export default BookingForm;
