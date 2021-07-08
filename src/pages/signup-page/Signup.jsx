import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Signup.css";
import TextField from "@material-ui/core/TextField";
import UserServices from "../../services/UserServices";

const services = new UserServices();

export default function Signup() {
  const [fullName, setName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [mobileNum, setNum] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [numErr, setNumErr] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleNum = (e) => {
    setNum(e.target.value);
  };

  const validation = () => {
    let isError = false;
    if (fullName === "") {
      setNameErr(true);
    } else {
      setNameErr(false);
    }

    if (emailId === "") {
      setMailErr(true);
    } else {
      setMailErr(false);
    }

    if (password === "") {
      setPassErr(true);
    } else {
      setPassErr(false);
    }

    if (mobileNum === "") {
      setNumErr(true);
    } else {
      setNumErr(false);
    }

    isError = nameErr || mailErr || passErr || numErr;

    return isError;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    var isValid = validation();
    console.log(isValid);
    if (isValid) {
      console.log("Failed");
    } else {
      let data = {
        fullName: fullName,
        email: emailId,
        password: password,
        phone: mobileNum,
      };
      console.log(data);
      services
        .signup(data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.result.accessToken);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit} className="signup-form">
        <div className="signin-textfield">
          <TextField
            error={nameErr}
            helperText={nameErr ? "Enter your name" : ""}
            name="fullName"
            label="Full Name"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleName}
          />
        </div>
        <div className="signin-textfield">
          <TextField
            error={mailErr}
            helperText={mailErr ? "Enter your email id" : ""}
            name="emailId"
            label="Email id"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleEmail}
            type="email"
          />
        </div>
        <div className="signin-textfield">
          <TextField
            error={passErr}
            helperText={passErr ? "Enter password" : ""}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handlePass}
          />
        </div>
        <div className="signin-textfield">
          <TextField
            error={numErr}
            helperText={numErr ? "Enter your mobile number" : ""}
            name="mobileNumber"
            label="Mobile Number"
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleNum}
          />
        </div>
        <Button
          fullWidth
          className="login-btn"
          style={{ backgroundColor: "#802F34", color: "#ffffff" }}
          onClick={onFormSubmit}
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
