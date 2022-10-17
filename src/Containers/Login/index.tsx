import { Email, Password } from "@mui/icons-material";
import { Input, Typography } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const isSignUp = true;
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <>
      <Typography>{isSignUp ? "SIGN UP" : "LOGIN"}</Typography>
      <Input
        value={emailInput}
        onChange={(e) => {
          setEmailInput(e.target.value);
        }}
        startAdornment={<Email />}
        placeholder="Email"
      />
      <Input
        value={passwordInput}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
        startAdornment={<Password />}
        placeholder="Password"
      />
    </>
  );
};

export default Login;
