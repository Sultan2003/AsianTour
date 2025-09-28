import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./WeatherPage.module.scss";
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";
import { BiFontSize } from "react-icons/bi";

const API_KEY = "d3384809bcf7660dab592a3cb8861967";

const COUNTRY_CITIES = {
  uzbekistan: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Nukus"],
  kyrgyzstan: ["Bishkek", "Osh"],
};

const CLIMATE_SUMMARIES = {
  uzbekistan: {
    title: "Uzbekistan Weather",
    overview:
      "Uzbekistan has an extreme continental climate: hot summers and cold winters. The south is warmer than the north. Spring and autumn are the most pleasant seasons for travel.",
    bestTime:
      "Best time to visit: Spring (April–June) and Autumn (September–October).",
  },
  kyrgyzstan: {
    title: "Kyrgyzstan Weather",
    overview:
      "Kyrgyzstan is mountainous: cold winters and cool summers in high elevations. Lowland areas may be warmer in summer.",
    bestTime:
      "Best time to visit: Summer for mountain trekking (June–September).",
  },
};

const WEATHER_ICON_MAP = {
  "01d": <WiDaySunny />,
  "01n": <WiNightClear />,
  "02d": <WiCloud />,
  "02n": <WiCloud />,
  "03d": <WiCloudy />,
  "03n": <WiCloudy />,
  "04d": <WiCloudy />,
  "04n": <WiCloudy />,
  "09d": <WiRain />,
  "09n": <WiRain />,
  "10d": <WiDayRain />,
  "10n": <WiRain />,
  "11d": <WiThunderstorm />,
  "11n": <WiThunderstorm />,
  "13d": <WiSnow />,
  "13n": <WiSnow />,
  "50d": <WiFog />,
  "50n": <WiFog />,
};

function WeatherIcon({ icon }) {
  return (
    <div className={styles.weatherIcon}>
      {WEATHER_ICON_MAP[icon] || <WiCloud />}
    </div>
  );
}

export default function WeatherPage({ countrySlug: propCountrySlug }) {
  const params = useParams();
  const navigate = useNavigate();
  const countrySlug = (
    propCountrySlug ||
    params.country ||
    params.countrySlug ||
    "uzbekistan"
  ).toLowerCase();

  const [cityForecasts, setCityForecasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("today");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      setCityForecasts([]);

      const cities = COUNTRY_CITIES[countrySlug];
      if (!cities?.length) {
        setError("No cities configured for this country.");
        setLoading(false);
        return;
      }

      try {
        const forecasts = await Promise.all(
          cities.map(async (city) => {
            const currentRes = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${API_KEY}`
            );
            if (!currentRes.ok) throw new Error(`Failed current for ${city}`);
            const currentData = await currentRes.json();

            const forecastRes = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${API_KEY}`
            );
            if (!forecastRes.ok) throw new Error(`Failed forecast for ${city}`);
            const forecastData = await forecastRes.json();

            // Group hourly forecasts by day
            const groupedByDate = {};
            forecastData.list.forEach((f) => {
              const date = f.dt_txt.split(" ")[0];
              if (!groupedByDate[date]) groupedByDate[date] = [];
              groupedByDate[date].push(f);
            });

            return {
              city,
              current: {
                temp: currentData.main.temp,
                description: currentData.weather[0].description,
                icon: currentData.weather[0].icon,
              },
              daily: Object.entries(groupedByDate).map(([date, entries]) => ({
                date,
                entries,
              })),
            };
          })
        );
        setCityForecasts(forecasts);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [countrySlug]);

  const climate = CLIMATE_SUMMARIES[countrySlug] || {
    title: `${countrySlug} Weather`,
    overview: "",
    bestTime: "",
  };

  const getTabs = (daily) => {
    const keys = daily.map((d) => d.date);
    return {
      today: keys[0],
      tomorrow: keys[1],
      plus3d: keys.slice(2),
    };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <span className={styles.link} onClick={() => navigate("/")}>
            Home
          </span>{" "}
          /{" "}
          <span
            className={styles.link}
            onClick={() => navigate(`/${countrySlug}`)}
          >
            {countrySlug}
          </span>{" "}
          / Weather
        </nav>

        <header className={styles.header}>
          <h1>{climate.title}</h1>
          <p className={styles.lead}>{climate.overview}</p>
          <p className={styles.best}>
            <strong>{climate.bestTime}</strong>
          </p>
        </header>

        <section className={styles.weatherSection}>
          <h2>5-Day 3-Hourly Forecast</h2>
          {loading && <p className={styles.info}>Loading forecasts...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}

          {cityForecasts.map((cf) => {
            const tabs = getTabs(cf.daily);
            return (
              <div className={styles.cityBlock} key={cf.city}>
                <div className={styles.currentRow}>
                  <h3>{cf.city}</h3>
                  {cf.current && (
                    <>
                      <div className={styles.currentTemp}>
                        <p style={{ fontSize: "19px" }}>Current Temperature:</p>{" "}
                        {Math.round(cf.current.temp)}°C
                        <WeatherIcon icon={cf.current.icon} />
                      </div>
                      <div className={styles.currentMeta}>
                        {cf.current.description}
                      </div>
                    </>
                  )}
                </div>

                <div className={styles.tabSwitcher}>
                  <button
                    className={activeTab === "today" ? styles.active : ""}
                    onClick={() => setActiveTab("today")}
                  >
                    Today
                  </button>
                  <button
                    className={activeTab === "tomorrow" ? styles.active : ""}
                    onClick={() => setActiveTab("tomorrow")}
                  >
                    Tomorrow
                  </button>
                  <button
                    className={activeTab === "plus3d" ? styles.active : ""}
                    onClick={() => setActiveTab("plus3d")}
                  >
                    +3d
                  </button>
                </div>

                {activeTab === "today" &&
                  cf.daily
                    .filter((d) => d.date === tabs.today)
                    .map((day) => <DayRow key={day.date} day={day} isToday />)}
                {activeTab === "tomorrow" &&
                  cf.daily
                    .filter((d) => d.date === tabs.tomorrow)
                    .map((day) => <DayRow key={day.date} day={day} />)}
                {activeTab === "plus3d" &&
                  tabs.plus3d.map((dateKey) =>
                    cf.daily
                      .filter((d) => d.date === dateKey)
                      .map((day) => <DayRow key={day.date} day={day} />)
                  )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

function DayRow({ day, isToday }) {
  const nowHour = new Date().getHours();

  return (
    <div className={styles.daySection}>
      <h4 className={styles.dayTitle}>
        {isToday
          ? "Today"
          : new Date(day.date).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
      </h4>
      <div className={styles.hourlyRow}>
        {day.entries.map((entry) => {
          const entryHour = new Date(entry.dt * 1000).getHours();
          // Skip past hours only for today
          if (isToday && entryHour < nowHour) return null;

          return (
            <div className={styles.hourCard} key={entry.dt}>
              <div className={styles.hourLabel}>
                {new Date(entry.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <WeatherIcon icon={entry.weather[0].icon} />
              <div className={styles.hourTemp}>
                {Math.round(entry.main.temp)}°C
              </div>
              <div className={styles.hourMeta}>
                {entry.weather[0].description}
              </div>
              {entry.rain?.["3h"] && (
                <div className={styles.hourRain}>
                  🌧 {entry.rain["3h"].toFixed(1)} mm
                </div>
              )}
              {entry.snow?.["3h"] && (
                <div className={styles.hourSnow}>
                  ❄ {entry.snow["3h"].toFixed(1)} mm
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
