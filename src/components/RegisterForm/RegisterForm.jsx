import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registerForm.scss";

function RegisterForm() {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [nameInputTouched, setNameInputTouched] = useState(false);

  const confirmRef = useRef();
  const [password, setPassword] = useState("");
  const [passwordInputTouched, setPasswordInputTouched] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const phoneRef = useRef();
  const emailRef = useRef();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setNameInputTouched(true);
    setEnteredName(e.target.value);

    console.log(enteredName);
    if (enteredName && enteredName.trimStart()) {
      setEnteredNameIsValid(true);
    } else {
      setEnteredNameIsValid(false);
    }
  };

  const reset = () => {
    setEmailIsValid(true);
    setPhoneIsValid(true);
    setPasswordMatch(true);
  };

  const handlePasswordChange = (e) => {
    setPasswordInputTouched(true);
    setPassword(e.target.value);

    if (password.length >= 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    reset();

    setPasswordInputTouched(true);
    setNameInputTouched(true);
    if (confirmRef.current.value !== password) {
      setPasswordMatch(false);
    }
    if (!emailRef.current.value.includes("@")) {
      setEmailIsValid(false);
    }
    if (phoneRef.current.value.length !== 10) {
      setPhoneIsValid(false);
    }

    if (passwordIsValid && emailIsValid && phoneIsValid && passwordMatch) {
      setFormValid(true);
    } else {
      return;
    }

    if (formValid) navigate("/chart");
  };

  return (
    <div className="rform">
      <div className="rform__container">
        <h2>Create an account</h2>

        <form onSubmit={submitHandler}>
          <div className="rform__formcontrol">
            <label htmlFor="email">Your email address</label>
            <br />
            <input type="email" id="email" ref={emailRef} />
            {!emailIsValid && (
              <p className="rform__error">email is not valid</p>
            )}
          </div>
          <div className="rform__formcontrol">
            <label htmlFor="password">Your password</label>
            <br />
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
            {passwordInputTouched && !passwordIsValid && (
              <p className="rform__error">password must be of 6 charecters</p>
            )}
          </div>
          <div className="rform__formcontrol">
            <label htmlFor="confirmpassword">Confirm your password</label>
            <br />
            <input type="password" id="confirmpassword" ref={confirmRef} />
            {!passwordMatch && (
              <p className="rform__error">passwords do not match</p>
            )}
          </div>
          <div className="rform__formcontrol">
            <label htmlFor="name">Your full name</label>
            <br />
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={handleNameChange}
            />
            {!enteredNameIsValid && nameInputTouched && (
              <p className="rform__error">name is not valid</p>
            )}
          </div>
          <div className="rform__formcontrolphone">
            <label htmlFor="phone">Your phone number</label>
            <br />
            <input type="text" id="phone" ref={phoneRef} />
            {!phoneIsValid && (
              <p className="rform__error">phone number is not valid</p>
            )}
          </div>
          <div className="rform__formcontrolterms">
            <input type="checkbox" />
            <label htmlFor="terms">I read and agree Terms and Conditions</label>
          </div>
          <div className="form__actions">
            <button type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
