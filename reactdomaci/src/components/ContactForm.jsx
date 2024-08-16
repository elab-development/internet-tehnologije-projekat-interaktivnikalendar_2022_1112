import React from "react";
import useForm from "../hooks/useForm";
import InputField from "./InputField";
import Button from "./Button";
import "./ContactForm.css";

const ContactForm = () => {
  const { values, handleChange, handleSubmit } = useForm(
    { name: "", email: "", message: "" },
    (formValues) => {
      console.log("Forma popunjena sledecim vrednostima:", formValues);
      alert("Zahtev uspesno prosledjen!");
    }
  );

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <InputField
        className="input-field"
        label="Ime"
        type="text"
        value={values.name}
        onChange={handleChange}
        name="name"
      />
      <InputField
        className="input-field"
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange}
        name="email"
      />
      <InputField
        className="input-field"
        label="Poruka"
        type="text"
        value={values.message}
        onChange={handleChange}
        name="message"
      />
      <Button className="custom-button" text="Submit" />
    </form>
  );
};

export default ContactForm;
