import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import UserServices from "../../services/UserServices";
import { useHistory } from "react-router";

const services = new UserServices();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [mailError, setMailErr] = useState(false);
  const [passError, setPassErr] = useState(false);
  const history = new useHistory();
  const validation = () => {
    let isError = false;
    if (email === "") {
      setMailErr(true);
    } else if (email !== "") {
      setMailErr(false);
    }
    if (password === "") {
      setPassErr(true);
    } else if (password !== "") {
      setPassErr(false);
    }

    isError = mailError || passError;
    return isError;
  };

  const onSubmitForm = () => {
    let isValid = validation();
    if (isValid) {
      console.log("failed");
    } else {
      let data = {
        email: email,
        password: password,
      };
      services
        .login(data)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.result.accessToken);
          history.push("/bookstore");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitForm} className="login-form">
        <div className="textfield">
          <TextField
            error={mailError}
            helperText={mailError ? "Enter your email" : ""}
            name="email"
            label="Email ID"
            variant="outlined"
            fullWidth
            onChange={handleEmail}
          />
        </div>
        <div className="textfield">
          <TextField
            name="password"
            error={passError}
            helperText={passError ? "enter password" : ""}
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            onChange={handlePass}
          />
        </div>
        <Button
          fullWidth
          className="login-btn"
          style={{ backgroundColor: "#802F34", color: "#ffffff" }}
          onClick={onSubmitForm}
        >
          Login
        </Button>
        <h4 className="divider">OR</h4>
        <div className="btns">
          <Button
            style={{
              backgroundColor: "#4266B2",
              color: "#ffffff",
              textTransform: "capitalize",
              padding: "10px 30px",
            }}
            className="fb-btn"
          >
            Facebook
          </Button>
          <Button
            style={{
              backgroundColor: "#E4E4E4",
              color: "#000000",
              textTransform: "capitalize",
              width: "50%",
            }}
          >
            Google
          </Button>
        </div>
      </form>
    </div>
  );
}
