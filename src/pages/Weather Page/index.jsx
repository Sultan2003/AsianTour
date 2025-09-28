import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
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
    bestTime: "Best time to visit: Summer for mountain trekking (June–September).",
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
  const countrySlug =
    (propCountrySlug || params.country || params.countrySlug || "uzbekistan").toLowerCase();
  const navigate = useNavigate();
  const [cityForecasts, setCityForecasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            // Current weather
            const currentRes = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            if (!currentRes.ok) throw new Error(`Failed current for ${city}`);
            const currentData = await currentRes.json();

            // 5-day forecast
            const forecastRes = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            if (!forecastRes.ok) throw new Error(`Failed forecast for ${city}`);
            const forecastData = await forecastRes.json();

            // Group by day
            const grouped = {};
            forecastData.list.forEach((f) => {
              const date = f.dt_txt.split(" ")[0];
              if (!grouped[date]) grouped[date] = [];
              grouped[date].push(f);
            });

            // Calculate daily values
            const daily = Object.entries(grouped)
              .slice(0, 5)
              .map(([date, entries]) => {
                const minTemp = Math.min(...entries.map((e) => e.main.temp_min));
                const maxTemp = Math.max(...entries.map((e) => e.main.temp_max));
                const humidity = Math.round(
                  entries.reduce((sum, e) => sum + e.main.humidity, 0) / entries.length
                );
                const wind = Math.round(
                  entries.reduce((sum, e) => sum + e.wind.speed, 0) / entries.length
                );
                const rain = entries.reduce((sum, e) => sum + (e.rain?.["3h"] || 0), 0);
                const snow = entries.reduce((sum, e) => sum + (e.snow?.["3h"] || 0), 0);

                const iconCounts = {};
                entries.forEach((e) => {
                  const ic = e.weather[0].icon;
                  iconCounts[ic] = (iconCounts[ic] || 0) + 1;
                });
                const topIcon = Object.entries(iconCounts).sort((a, b) => b[1] - a[1])[0][0];
                const topDesc = entries.find((e) => e.weather[0].icon === topIcon)?.weather[0]
                  .description;

                return {
                  dt: entries[0].dt,
                  date,
                  minTemp,
                  maxTemp,
                  icon: topIcon,
                  description: topDesc,
                  pop: Math.max(...entries.map((e) => e.pop || 0)),
                  humidity,
                  wind,
                  rain,
                  snow,
                };
              });

            return {
              city,
              current: {
                temp: currentData.main.temp,
                description: currentData.weather[0].description,
                icon: currentData.weather[0].icon,
              },
              daily,
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
  <span className={styles.link} onClick={() => navigate("/")}>
    Home
  </span>{" "}
  /{" "}
  <span className={styles.link} onClick={() => navigate(`/${countrySlug}`)}>
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
          <h2>5-Day Forecast for Main Cities</h2>
          {loading && <p className={styles.info}>Loading forecasts...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}

          <div className={styles.citiesGrid}>
            {cityForecasts.map((cf) => (
              <div className={styles.cityBlock} key={cf.city}>
                <div className={styles.currentRow}>
                  <h3>{cf.city}</h3>
                  {cf.current && (
                    <>
                      <div className={styles.currentTemp}>
                        {Math.round(cf.current.temp)}°C
                        <WeatherIcon icon={cf.current.icon} />
                      </div>
                      <div className={styles.currentMeta}>{cf.current.description}</div>
                    </>
                  )}
                </div>

                <div className={styles.dayCards}>
                  {cf.daily?.map((it, idx) => (
                    <div className={styles.dayCard} key={idx}>
                      <div className={styles.dayLabel}>
                        {new Date(it.dt * 1000).toLocaleDateString(undefined, {
                          weekday: "short",
                        })}
                      </div>
                      <div className={styles.dayIcon}>
                        <WeatherIcon icon={it.icon} />
                      </div>
                      <div className={styles.dayTemp}>
                        {Math.round(it.maxTemp)}° / {Math.round(it.minTemp)}°
                      </div>
                      <div className={styles.dayPrecip}>
                        {it.pop ? `${Math.round(it.pop * 100)}% chance` : "–"}
                        {it.rain > 0 && <span> • {it.rain.toFixed(1)} mm rain</span>}
                        {it.snow > 0 && <span> • {it.snow.toFixed(1)} mm snow</span>}
                      </div>
                      <div className={styles.dayMeta}>
                        💨 {it.wind} m/s • 💦 {it.humidity}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
