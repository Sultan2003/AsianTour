import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BookingForm.module.scss";
import Kamola from "../../assets/stuff/1.png";
import tashkent from "../../assets/Cities/Tashkent City Images/Amir Temur Statue.jpg";
import samarkand from "../../assets/Cities/Samarkand/Shah i Zinda Necropolis 1.jpg";
import bukhara from "../../assets/Cities/Bukhara/Bolo hauz Mosque.jpg";
import khiva from "../../assets/Cities/Khiva/Islam Khodja Minaret.jpg";

const TELEGRAM_BOT_TOKEN = "7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY";
const TELEGRAM_CHAT_ID = "-1003082651864";

const CITY_CARDS = [
  { id: "tashkent", label: "Tashkent", image: tashkent },
  { id: "samarkand", label: "Samarkand", image: samarkand },
  { id: "bukhara", label: "Bukhara", image: bukhara },
  { id: "khiva", label: "Khiva", image: khiva },
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

const bookingCopy = {
  en: {
    required: "Please complete required fields on this step.", sent: "✅ Request sent successfully.", failed: "❌ Failed to send. Please try again.",
    manager: "Kamola Rasuleva · Manager", help: "Please complete each step. If you are not sure, choose the closest option and add notes.", step: "Step", back: "← Back", next: "Next →", sending: "Sending...", submit: "Send booking request",
    q: ["Which city are you flying to?", "What time are you arriving?", "Can you start excursion on the first day?", "Tell us about group size and nights", "Which city do you plan to visit next?", "How many nights in this city?", "Which city do you plan to visit after that?", "How many nights in the third city?", "Departure city and extra wishes", "Final step: your contact details"],
    yesNo: ["Yes", "No, need rest", "Not sure"], labels: ["Guests count *", "Total nights for whole tour *", "Nights in first city *", "Main things to see in first city", "Nights in second city *", "Main things to see in second city", "Nights in third city *", "Main things to see in third city", "From which city do you fly home? *", "Extra wishes / cities / important notes", "Name *", "Phone *", "Email", "Best contact channel", "I agree with personal data processing policy."], placeholder: "Example: Tashkent",
    times: TIME_OPTIONS,
  },
  ru: {
    required: "Пожалуйста, заполните обязательные поля на этом шаге.", sent: "✅ Заявка успешно отправлена.", failed: "❌ Не удалось отправить. Попробуйте ещё раз.",
    manager: "Камола Расулева · менеджер", help: "Пожалуйста, заполните каждый шаг. Если вы не уверены, выберите ближайший вариант и добавьте комментарии.", step: "Шаг", back: "← Назад", next: "Далее →", sending: "Отправка...", submit: "Отправить заявку",
    q: ["В какой город вы прилетаете?", "В какое время вы прибываете?", "Сможете начать экскурсию в первый день?", "Расскажите о количестве гостей и ночах", "Какой город планируете посетить следующим?", "Сколько ночей в этом городе?", "Какой город планируете посетить после этого?", "Сколько ночей в третьем городе?", "Город вылета и дополнительные пожелания", "Финальный шаг: ваши контакты"],
    yesNo: ["Да", "Нет, нужен отдых", "Не уверен(а)"], labels: ["Количество гостей *", "Всего ночей на весь тур *", "Ночей в первом городе *", "Что обязательно посмотреть в первом городе", "Ночей во втором городе *", "Что обязательно посмотреть во втором городе", "Ночей в третьем городе *", "Что обязательно посмотреть в третьем городе", "Из какого города вы улетаете домой? *", "Дополнительные пожелания / города / важные заметки", "Имя *", "Телефон *", "Email", "Предпочтительный способ связи", "Я согласен(на) с обработкой персональных данных."], placeholder: "Например: Ташкент",
    times: ["Ночь (00:00 - 06:00)", "Утро (06:00 - 12:00)", "День (12:00 - 18:00)", "Вечер (18:00 - 24:00)", "Пока не знаю"],
  }
};

const BookingForm = () => {
  const { i18n } = useTranslation();
  const copy = bookingCopy[(i18n.resolvedLanguage || i18n.language || "en").split("-")[0]] || bookingCopy.en;
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
        return Boolean(
          formData.guests && formData.totalNights && formData.firstCityNights,
        );
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
      alert(copy.required);
      return;
    }
    setCurrentStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const cityCard = (title, value, image, fieldName) => (
    <button
      type="button"
      className={`${styles.cityCard} ${
        value === formData[fieldName] ? styles.selected : ""
      }`}
      onClick={() => updateField(fieldName, value)}
    >
      <div className={styles.cityImage}>
        {image ? <img src={image} alt={title} /> : <span>No image</span>}
      </div>
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
      alert(copy.required);
      return;
    }

    setIsSending(true);
    try {
      await sendToTelegram();
      alert(copy.sent);
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
      alert(copy.failed);
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
              {currentStep === 1 && copy.q[0]}
              {currentStep === 2 && copy.q[1]}
              {currentStep === 3 && copy.q[2]}
              {currentStep === 4 && copy.q[3]}
              {currentStep === 5 && copy.q[4]}
              {currentStep === 6 && copy.q[5]}
              {currentStep === 7 && copy.q[6]}
              {currentStep === 8 && copy.q[7]}
              {currentStep === 9 && copy.q[8]}
              {currentStep === 10 && copy.q[9]}
            </h1>

            <div className={styles.managerCard}>
              <img src={Kamola} className={styles.avatar}></img>
              <div>
                <strong>{copy.manager}</strong>
                <p>
                  {copy.help}
                </p>
              </div>
            </div>

            <p className={styles.stepLabel}>
              {copy.step}: {currentStep}/{TOTAL_STEPS}
            </p>
          </section>

          <section className={styles.rightPane}>
            {currentStep === 1 && (
              <div className={styles.cardsGrid}>
                {CITY_CARDS.map((city) =>
                  cityCard(city.label, city.label, city.image, "arrivalCity"),
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.optionColumn}>
                {copy.times.map((time) => (
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
                {copy.yesNo.map((option) => (
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
                  {copy.labels[0]}
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.guests}
                    onChange={(e) => updateField("guests", e.target.value)}
                  />
                </label>
                <label>
                  {copy.labels[1]}
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.totalNights}
                    onChange={(e) => updateField("totalNights", e.target.value)}
                  />
                </label>
                <label>
                  {copy.labels[2]}
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.firstCityNights}
                    onChange={(e) =>
                      updateField("firstCityNights", e.target.value)
                    }
                  />
                </label>
                <label>
                  {copy.labels[3]}
                  <textarea
                    rows="4"
                    value={formData.firstCityMustSee}
                    onChange={(e) =>
                      updateField("firstCityMustSee", e.target.value)
                    }
                  />
                </label>
              </div>
            )}

            {currentStep === 5 && (
              <div className={styles.cardsGrid}>
                {CITY_CARDS.map((city) =>
                  cityCard(city.label, city.label, city.image, "secondCity"),
                )}
              </div>
            )}

            {currentStep === 6 && (
              <div className={styles.optionColumn}>
                <label>
                  {copy.labels[4]}
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.secondCityNights}
                    onChange={(e) =>
                      updateField("secondCityNights", e.target.value)
                    }
                  />
                </label>
                <label>
                  {copy.labels[5]}
                  <textarea
                    rows="5"
                    value={formData.secondCityMustSee}
                    onChange={(e) =>
                      updateField("secondCityMustSee", e.target.value)
                    }
                  />
                </label>
              </div>
            )}

            {currentStep === 7 && (
              <div className={styles.cardsGrid}>
                {CITY_CARDS.map((city) =>
                  cityCard(city.label, city.label, city.image, "thirdCity"),
                )}
              </div>
            )}

            {currentStep === 8 && (
              <div className={styles.optionColumn}>
                <label>
                  {copy.labels[6]}
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.thirdCityNights}
                    onChange={(e) =>
                      updateField("thirdCityNights", e.target.value)
                    }
                  />
                </label>
                <label>
                  {copy.labels[7]}
                  <textarea
                    rows="5"
                    value={formData.thirdCityMustSee}
                    onChange={(e) =>
                      updateField("thirdCityMustSee", e.target.value)
                    }
                  />
                </label>
              </div>
            )}

            {currentStep === 9 && (
              <div className={styles.optionColumn}>
                <label>
                  {copy.labels[8]}
                  <input
                    type="text"
                    value={formData.departureCity}
                    onChange={(e) =>
                      updateField("departureCity", e.target.value)
                    }
                    placeholder={copy.placeholder}
                  />
                </label>
                <label>
                  {copy.labels[9]}
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
                  {copy.labels[10]}
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </label>
                <label>
                  {copy.labels[11]}
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </label>
                <label>
                  {copy.labels[12]}
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </label>
                <label>
                  {copy.labels[13]}
                  <select
                    value={formData.preferredContact}
                    onChange={(e) =>
                      updateField("preferredContact", e.target.value)
                    }
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
                  {copy.labels[14]}
                </label>
              </div>
            )}

            <div className={styles.navButtons}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                {copy.back}
              </button>

              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={nextStep}
                >
                  {copy.next}
                </button>
              ) : (
                <button
                  type="submit"
                  className={styles.nextBtn}
                  disabled={isSending}
                >
                  {isSending ? copy.sending : copy.submit}
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
