import React, { useState } from "react";
import { Moon, Sun } from "lucide-react"; // lucide icons for toggle

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [showBox, setShowBox] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,cloud_cover,is_day,precipitation`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.current);
      setShowBox(true);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all duration-700 px-4 sm:px-6 md:px-8 ${
        darkMode ? "bg-dark-animated-gradient" : "bg-light-animated-gradient"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 sm:right-8 flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-glass border border-white/30 shadow-md hover:scale-110 transition-all duration-300"
        >
          {darkMode ? (
            <Sun className="text-yellow-300 w-6 h-6" />
          ) : (
            <Moon className="text-white w-6 h-6" />
          )}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl mb-8 font-bold text-white tracking-wider drop-shadow-lg">
        Zephyr
      </h1>
      <p className="text-white text-xl py-4 font-serif drop-shadow-lg">Real-time weather, powered by precision</p>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-white/20 p-3 rounded-xl w-full text-center text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6a85f1] transition-all duration-300 bg-glass shadow-xl"
        />
        <button
          onClick={fetchWeather}
          className="bg-gradient-to-r from-[#ff7eb3] to-[#6a85f1] text-white px-6 py-2 rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 font-semibold tracking-wide w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Weather Info Card */}
      {showBox && weather && (
        <div className="mt-10 flex flex-col items-center justify-center rounded-3xl w-full max-w-5xl p-6 sm:p-8 text-center bg-glass border border-white/30 shadow-2xl backdrop-blur-2xl hover:scale-[1.02] transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 uppercase tracking-wide drop-shadow-sm">
            {city}
          </h2>
          <hr className="bg-white/50 h-[1px] w-full max-w-3xl border-none mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 text-left w-full max-w-3xl text-white">
            <div>
              <p className="text-sm sm:text-md text-gray-200 uppercase tracking-wide">
                Temperature
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-2 drop-shadow-md">
                {weather.temperature_2m}°C
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-md text-gray-200 uppercase tracking-wide">
                Humidity
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-2 drop-shadow-md">
                {weather.relative_humidity_2m}%
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-md text-gray-200 uppercase tracking-wide">
                Cloud Cover
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-2 drop-shadow-md">
                {weather.cloud_cover}%
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-md text-gray-200 uppercase tracking-wide">
                Condition
              </p>
              <p className="text-3xl sm:text-4xl font-bold mt-2 italic drop-shadow-md">
                {weather.is_day
                  ? weather.cloud_cover > 50
                    ? "Cloudy"
                    : "Sunny"
                  : "Night"}
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-md text-gray-200 uppercase tracking-wide">
                Rain
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold mt-2 drop-shadow-md">
                {weather.precipitation} mm
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
