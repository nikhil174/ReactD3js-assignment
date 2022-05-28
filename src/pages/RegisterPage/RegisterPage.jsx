import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import SideImg from "../../components/SideImg/SideImg";
import "./registerPage.scss";

const RegisterPage = () => {
  return (
    <div className="register">
      <SideImg />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
