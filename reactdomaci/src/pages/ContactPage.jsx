import React from "react";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import "./HomePage.css";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-app">
        <div className="home-content">
          <h1 className="home-heading"> Kontakt stranica </h1>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
