import React from "react";
import Button from "@material-ui/core/Button";
import "./Login.css";
import TextField from "@material-ui/core/TextField";

export default function Login() {
  return (
    <div>
      <div className="textfield">
        <TextField label="Email ID" variant="outlined" fullWidth />
      </div>
      <div className="textfield">
        <TextField label="Password" variant="outlined" fullWidth />
      </div>
      <Button
        fullWidth
        className="login-btn"
        style={{ backgroundColor: "#802F34", color: "#ffffff" }}
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
    </div>
  );
}
