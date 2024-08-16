import React from "react";
import "./InputField.css";

const InputField = ({ label, type, value, onChange, name, className }) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} name={name} />
    </div>
  );
};

export default InputField;
