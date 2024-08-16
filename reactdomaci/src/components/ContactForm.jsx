import React from "react";
import useForm from "../hooks/useForm";
import InputField from "./InputField";
import Button from "./Button";

const ContactForm = () => {
  const { values, handleChange, handleSubmit } = useForm(
    { name: "", email: "", message: "" },
    (formValues) => {
      console.log("Form submitted with values:", formValues);
      alert("Form submitted successfully!");
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Name"
        type="text"
        value={values.name}
        onChange={handleChange}
        name="name"
      />
      <InputField
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange}
        name="email"
      />
      <InputField
        label="Message"
        type="text"
        value={values.message}
        onChange={handleChange}
        name="message"
      />
      <Button text="Submit" />
    </form>
  );
};

export default ContactForm;
