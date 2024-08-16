import React, { useEffect, useState } from "react";

const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=belgrade&appid=10573a10050b108852e2ba526fdb0807&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    };
    fetchWeather();
  }, []);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="weather-display">
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;
