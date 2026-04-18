import React, { useMemo, useState } from "react";
import styles from "./BookingForm.module.scss";

const TELEGRAM_BOT_TOKEN = "7509089585:AAFlUQJVRK3qtgLN4FVWHwEPeahjfv2oFpY";
const TELEGRAM_CHAT_ID = "-1003082651864";

const CITY_OPTIONS = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Khiva",
  "Nukus",
  "Shakhrisabz",
  "Zaamin",
  "Almaty",
  "Bishkek",
  "Dushanbe",
  "Baku",
  "Tbilisi",
  "Yerevan",
  "Other",
];

const ARRIVAL_TIME_OPTIONS = [
  "Night (00:00 – 06:00)",
  "Morning (06:00 – 12:00)",
  "Day (12:00 – 18:00)",
  "Evening (18:00 – 24:00)",
  "I don't know yet",
];

const CONTACT_OPTIONS = ["WhatsApp", "Telegram", "Phone Call", "Email"];

const createInitialStop = () => ({ city: "", nights: "", mustSee: "", image: null });

const BookingForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    preferredContact: CONTACT_OPTIONS[0],
    adults: 2,
    children: 0,
    infants: 0,
    rooms: 1,
    travelStartDate: "",
    travelEndDate: "",
    arrivalCity: "",
    arrivalTime: ARRIVAL_TIME_OPTIONS[4],
    firstDayExcursion: "not_sure",
    departureCity: "",
    budgetPerPerson: "",
    hotelCategory: "4-star",
    transportPreference: "Private car + train",
    dietaryRequirements: "",
    specialOccasion: "",
    additionalNotes: "",
    agreePolicy: false,
    itineraryStops: [createInitialStop(), createInitialStop(), createInitialStop()],
  });

  const totalGuests = useMemo(
    () => Number(formData.adults) + Number(formData.children) + Number(formData.infants),
    [formData.adults, formData.children, formData.infants],
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStopChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedStops = [...prev.itineraryStops];
      updatedStops[index] = { ...updatedStops[index], [field]: value };
      return { ...prev, itineraryStops: updatedStops };
    });
  };

  const buildTelegramMessage = () => {
    const stopsSummary = formData.itineraryStops
      .map((stop, index) => {
        const hasValue = stop.city || stop.nights || stop.mustSee;
        if (!hasValue) return null;

        return `
📍 *Stop ${index + 1}*
City: ${stop.city || "-"}
Nights: ${stop.nights || "-"}
Must-see: ${stop.mustSee || "-"}
Image: ${stop.image === null ? "null" : stop.image}`;
      })
      .filter(Boolean)
      .join("\n");

    return `
🧭 *New Tour Booking Form Submission*

👤 *Contact Info*
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || "-"}
Country: ${formData.country || "-"}
Preferred contact: ${formData.preferredContact}

✈️ *Travel Plan*
Arrival city: ${formData.arrivalCity}
Arrival time: ${formData.arrivalTime}
Ready for excursion on day 1: ${formData.firstDayExcursion}
Departure city: ${formData.departureCity}
Start date: ${formData.travelStartDate || "-"}
End date: ${formData.travelEndDate || "-"}

👥 *Guests & Stay*
Adults: ${formData.adults}
Children: ${formData.children}
Infants: ${formData.infants}
Total guests: ${totalGuests}
Rooms: ${formData.rooms}
Hotel category: ${formData.hotelCategory}
Budget (USD/person): ${formData.budgetPerPerson || "-"}
Transport preference: ${formData.transportPreference}

🏙️ *Itinerary Preferences*
${stopsSummary || "No route details yet"}

🍽️ Dietary requirements: ${formData.dietaryRequirements || "-"}
🎉 Special occasion: ${formData.specialOccasion || "-"}
📝 Additional notes: ${formData.additionalNotes || "-"}
`.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreePolicy) {
      alert("Please accept the privacy policy to continue.");
      return;
    }

    setIsSending(true);

    try {
      const text = buildTelegramMessage();

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: "Markdown",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Telegram request failed");
      }

      alert("✅ Thank you! Your request was sent successfully.");
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        phone: "",
        email: "",
        country: "",
        adults: 2,
        children: 0,
        infants: 0,
        rooms: 1,
        travelStartDate: "",
        travelEndDate: "",
        arrivalCity: "",
        arrivalTime: ARRIVAL_TIME_OPTIONS[4],
        firstDayExcursion: "not_sure",
        departureCity: "",
        budgetPerPerson: "",
        dietaryRequirements: "",
        specialOccasion: "",
        additionalNotes: "",
        agreePolicy: false,
        itineraryStops: [createInitialStop(), createInitialStop(), createInitialStop()],
      }));
    } catch (error) {
      console.error(error);
      alert("❌ Could not send form. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>Custom Tour Booking Form</h1>
        <p>
          Share your plans in 3 minutes. We will build a professional itinerary
          with best route, hotels, transport, and local experiences.
        </p>
      </section>

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.card}>
          <h2>1) Contact details</h2>
          <div className={styles.grid}>
            <label>
              Full name *
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone / WhatsApp *
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </label>
            <label>
              Preferred contact method
              <select
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleChange}
              >
                {CONTACT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className={styles.card}>
          <h2>2) Flight and travel window</h2>
          <div className={styles.grid}>
            <label>
              Arrival city *
              <select
                name="arrivalCity"
                value={formData.arrivalCity}
                onChange={handleChange}
                required
              >
                <option value="">Choose city</option>
                {CITY_OPTIONS.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Arrival time
              <select
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
              >
                {ARRIVAL_TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Start date
              <input
                type="date"
                name="travelStartDate"
                value={formData.travelStartDate}
                onChange={handleChange}
              />
            </label>
            <label>
              End date
              <input
                type="date"
                name="travelEndDate"
                value={formData.travelEndDate}
                onChange={handleChange}
              />
            </label>
            <label>
              Departure city *
              <select
                name="departureCity"
                value={formData.departureCity}
                onChange={handleChange}
                required
              >
                <option value="">Choose city</option>
                {CITY_OPTIONS.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className={styles.inlineFieldset}>
            <legend>Can you start excursion on arrival day?</legend>
            <label>
              <input
                type="radio"
                name="firstDayExcursion"
                value="yes"
                checked={formData.firstDayExcursion === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="firstDayExcursion"
                value="no"
                checked={formData.firstDayExcursion === "no"}
                onChange={handleChange}
              />
              No, need rest
            </label>
            <label>
              <input
                type="radio"
                name="firstDayExcursion"
                value="not_sure"
                checked={formData.firstDayExcursion === "not_sure"}
                onChange={handleChange}
              />
              Not sure
            </label>
          </fieldset>
        </section>

        <section className={styles.card}>
          <h2>3) Group and accommodation</h2>
          <div className={styles.grid}>
            <label>
              Adults
              <input
                type="number"
                min="1"
                max="30"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
              />
            </label>
            <label>
              Children (2-11)
              <input
                type="number"
                min="0"
                max="20"
                name="children"
                value={formData.children}
                onChange={handleChange}
              />
            </label>
            <label>
              Infants (0-2)
              <input
                type="number"
                min="0"
                max="10"
                name="infants"
                value={formData.infants}
                onChange={handleChange}
              />
            </label>
            <label>
              Rooms needed
              <input
                type="number"
                min="1"
                max="20"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
              />
            </label>
            <label>
              Hotel category
              <select
                name="hotelCategory"
                value={formData.hotelCategory}
                onChange={handleChange}
              >
                <option value="3-star">3-star</option>
                <option value="4-star">4-star</option>
                <option value="5-star">5-star</option>
                <option value="Boutique / authentic hotels">
                  Boutique / authentic hotels
                </option>
                <option value="Mixed options">Mixed options</option>
              </select>
            </label>
            <label>
              Approx. budget per person (USD)
              <input
                type="number"
                min="0"
                step="10"
                name="budgetPerPerson"
                value={formData.budgetPerPerson}
                onChange={handleChange}
              />
            </label>
            <label>
              Transport preference
              <select
                name="transportPreference"
                value={formData.transportPreference}
                onChange={handleChange}
              >
                <option>Private car + train</option>
                <option>Mostly private car</option>
                <option>Flights where needed</option>
                <option>Best value mix</option>
                <option>No preference</option>
              </select>
            </label>
          </div>
          <p className={styles.totalGuests}>Total guests: {totalGuests}</p>
        </section>

        <section className={styles.card}>
          <h2>4) Route and must-see places</h2>
          <p className={styles.sectionHint}>
            Add up to 3 destination stops. Image fields are intentionally set to
            null for now.
          </p>

          {formData.itineraryStops.map((stop, index) => (
            <div className={styles.stopCard} key={`stop-${index + 1}`}>
              <h3>Stop {index + 1}</h3>
              <div className={styles.grid}>
                <label>
                  City / destination
                  <select
                    value={stop.city}
                    onChange={(e) =>
                      handleStopChange(index, "city", e.target.value)
                    }
                  >
                    <option value="">Choose city</option>
                    {CITY_OPTIONS.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Nights in this stop
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={stop.nights}
                    onChange={(e) =>
                      handleStopChange(index, "nights", e.target.value)
                    }
                  />
                </label>
                <label className={styles.fullWidth}>
                  Main things to see here
                  <textarea
                    rows="3"
                    value={stop.mustSee}
                    onChange={(e) =>
                      handleStopChange(index, "mustSee", e.target.value)
                    }
                    placeholder="Historical sites, food, markets, nature, activities..."
                  />
                </label>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.card}>
          <h2>5) Additional preferences</h2>
          <div className={styles.grid}>
            <label className={styles.fullWidth}>
              Dietary requirements
              <input
                type="text"
                name="dietaryRequirements"
                value={formData.dietaryRequirements}
                onChange={handleChange}
                placeholder="Vegetarian, halal, allergies, etc."
              />
            </label>
            <label className={styles.fullWidth}>
              Special occasion
              <input
                type="text"
                name="specialOccasion"
                value={formData.specialOccasion}
                onChange={handleChange}
                placeholder="Birthday, honeymoon, anniversary, business trip..."
              />
            </label>
            <label className={styles.fullWidth}>
              Extra notes
              <textarea
                rows="4"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any requests about hotels, guides, pace, shopping, children comfort, etc."
              />
            </label>
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="agreePolicy"
              checked={formData.agreePolicy}
              onChange={handleChange}
              required
            />
            I agree to data processing and allow the team to contact me about
            this booking request.
          </label>

          <button className={styles.submitButton} type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send booking request"}
          </button>
        </section>
      </form>
    </main>
  );
};

export default BookingForm;
