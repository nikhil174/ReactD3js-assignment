import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import "./registerForm.scss";

function RegisterForm() {
  const navigate = useNavigate();

  const initialData = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  };

  const [values, setValues] = useState(initialData);

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      errorMessage: "email is not valid",
      label: "Your email address",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      errorMessage:
        "password should be 6-10 characters and include at least 1 letter, 1 number and 1 special character",
      label: "Your Password",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      errorMessage: "passwords do not match!",
      label: "Confirm your password",
      pattern: values.password,
      required: true,
    },
    {
      id: 4,
      name: "name",
      errorMessage:
        "name should be of two words seperated by a space e.g. Nikhil Srivastava",
      label: "Your full name",
      pattern: "^[a-zA-z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$",
      required: true,
    },
    {
      id: 5,
      name: "phone",
      errorMessage: "phone number is not valid",
      label: "Your phone number",
      pattern: "^[0-9]{10,10}$",
      required: true,
    },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/chart");
  };

  return (
    <div className="rform">
      <div className="rform__container">
        <h2>Create an account</h2>

        <form onSubmit={submitHandler}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleChange}
            />
          ))}
          <div className="rform__terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I read and agree Terms and Conditions</label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
