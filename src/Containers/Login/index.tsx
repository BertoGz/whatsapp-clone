import {
  Button,
  Stack,
  Link,
  Typography,
  TextField,
  ButtonBase,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";

import { useState } from "react";
import image from "../../Files/splashImage.png";
import logo from "../../Files/logo.png";

const SignInContents = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Stack
        flex={1}
        maxWidth={"400px"}
        padding={3}
        direction="column"
        spacing={2}
        justifyContent="flex-start"
      >
        <Box
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "100px",
          }}
        >
          <img
            src={logo}
            style={{
              width: "300px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography textAlign="left">
          {isSignUp ? "SIGN UP" : "LOGIN"}
        </Typography>
        <TextField
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
          }}
          placeholder="Email"
          variant="filled"
        />
        <TextField
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          placeholder="Password"
          variant="filled"
          type="password"
        />
        <Button variant="contained"> {isSignUp ? "SIGN UP" : "LOGIN"}</Button>
        {isSignUp && (
          <>
            <Typography sx={{ padding: "40px" }}>
              Already A User?{" "}
              <Link>
                <ButtonBase
                  onClick={() => {
                    setIsSignUp(false);
                  }}
                >
                  Login
                </ButtonBase>
              </Link>
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

const Login = () => {
  return (
    <Grid
      container
      direction={"row"}
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item xs={12} md={6}>
        <SignInContents />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ position: "relative" }}>
          <Box>
            <img
              src={image}
              style={{ width: "90%", height: "90%", objectFit: "contain" }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" direction="row">
          <Link padding={2}>
            <ButtonBase>Contact Us</ButtonBase>
          </Link>
          <Link padding={2}>
            <ButtonBase>About Us</ButtonBase>
          </Link>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
