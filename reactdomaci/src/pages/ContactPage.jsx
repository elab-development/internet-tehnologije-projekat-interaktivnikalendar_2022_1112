import React from "react";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Kontaktiraj nas putem sledece forme!</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
