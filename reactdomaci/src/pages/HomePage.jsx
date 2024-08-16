import React from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="calendar-app">
        <div className="content">
          <h1 className="heading"> Pocetna stranica React aplikacije </h1>
          <WeatherDisplay />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
