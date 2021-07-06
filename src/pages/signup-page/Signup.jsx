import React from "react";
import Button from "@material-ui/core/Button";
import "./Signup.css";
import TextField from "@material-ui/core/TextField";

export default function Signup() {
  return (
    <div>
      <div className="signin-textfield">
        <TextField
          label="Full Name"
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
      <div className="signin-textfield">
        <TextField label="Email id" variant="outlined" fullWidth size="small" />
      </div>
      <div className="signin-textfield">
        <TextField label="Password" variant="outlined" fullWidth size="small" />
      </div>
      <div className="signin-textfield">
        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          size="small"
        />
      </div>
      <Button
        fullWidth
        className="login-btn"
        style={{ backgroundColor: "#802F34", color: "#ffffff" }}
      >
        Signup
      </Button>
    </div>
  );
}
