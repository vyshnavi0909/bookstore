import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./LoginSignup.css";
import logo from "../../logo.png";
import Login from "../login-page/Login";
import Signup from "../signup-page/Signup";

export default function LoginSignup() {
  const [click, setClick] = useState(false);

  const loginColor = click ? "#878787" : "#000000";
  const signupColor = click ? "#000000" : "#878787";

  let pageContent;
  if (!click) {
    pageContent = <Login />;
  } else {
    pageContent = <Signup />;
  }

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="logo-container">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="login-signup">
          <div className="btns-div">
            <Button style={{ color: loginColor }} onClick={handleClick}>
              <h2 className="btn-tag">LOGIN</h2>
            </Button>
            <Button style={{ color: signupColor }} onClick={handleClick}>
              <h2 className="btn-tag">SIGNUP</h2>
            </Button>
          </div>
          <div>{pageContent}</div>
        </div>
      </div>
    </div>
  );
}
