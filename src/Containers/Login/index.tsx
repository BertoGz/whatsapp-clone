import {
  Button,
  Stack,
  Link,
  Typography,
  TextField,
  ButtonBase,
  Grid,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import image from "../../Files/splashImage.png";
import logo from "../../Files/logo.png";
import {
  useMutationCreateUser,
  createUserErrorStates,
  useMutationLoginUser,
  loginUserErrorStates,
} from "../../ReactQuery";
import { useNavigate } from "react-router-dom";

const SignInContents = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutateAsync: loginMutation } = useMutationLoginUser();
  const { mutateAsync: createUserMutation } = useMutationCreateUser();
  function onLogin(isEmailLinkSignin = false) {
    loginMutation(
      { isEmailLinkSignin, email: emailInput, password: passwordInput },
      {
        onSuccess: () => {
          navigate("user");
        },
        onError: (res) => {
          setError(res);
        },
      }
    );
  }

  async function onConfirmCredential() {
    setError(null);
    if (isSignUp) {
      createUserMutation(
        { email: emailInput, password: passwordInput },
        {
          onSuccess: () => {
            navigate("user");
          },
          onError: (res) => {
            setError(res);
          },
        }
      );
    } else {
      //todo create user mutation
      onLogin();
    }
  }
  const checkEmailError = useMemo(() => {
    if (isSignUp) {
      return (
        error === createUserErrorStates.emailInUse ||
        error === createUserErrorStates.invalidEmail
      );
    } else {
      return error === loginUserErrorStates.incorrectCredentials;
    }
  }, [error, isSignUp]);
  const checkPasswordError = useMemo(() => {
    if (isSignUp) {
      return error === createUserErrorStates.weakPassword;
    } else {
      return error === loginUserErrorStates.incorrectCredentials;
    }
  }, [error, isSignUp]);

  const getErrorMessage = useMemo(() => {
    switch (error) {
      case createUserErrorStates.emailInUse:
        return "An account with that email already exists";
      case createUserErrorStates.invalidEmail:
        return "Please enter a valid email";
      case createUserErrorStates.weakPassword:
        return "Please use a password that is 6 or more characters in length";
      case loginUserErrorStates.incorrectCredentials:
        return "Incorrect password or email";
      case createUserErrorStates.networkError:
      case loginUserErrorStates.networkError:
        return "There is a network error";
    }
  }, [error]);
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

        <FormControl error={checkEmailError}>
          <TextField
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
            placeholder="Email"
            variant="filled"
          />
          {checkEmailError && (
            <FormHelperText>{getErrorMessage}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={checkPasswordError}>
          <TextField
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            placeholder="Password"
            variant="filled"
            type="password"
          />
          {checkPasswordError && (
            <FormHelperText>{getErrorMessage}</FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" onClick={onConfirmCredential}>
          {" "}
          {isSignUp ? "SIGN UP" : "LOGIN"}
        </Button>

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
