import React from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import Navbar from "../components/Navbar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div>
        <Navbar />
        <div className="home-app">
          <div className="home-content">
            <h1 className="home-heading">Pocetna stranica</h1>
            <WeatherDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
