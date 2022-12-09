import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryFirebaseUserData } from "../../ReactQuery";
import Contacts from "../Contacts";
import Profile from "../Profile";
import { FirebaseActions } from "../../Firebase";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chat from "../Chat";
import { useAppSelector } from "../../Redux/useAppSelector";
import { AppLogo } from "../../Components/AppLogo";
import { colorHelper } from "../../Theme";
import { PressableText } from "../../Components/ClickableText";
import { useMutationUpdateProfile } from "../../ReactQuery/Mutations/useMutationUpdateProfile";

const WelcomeElements = () => {
  return (
    <Stack flex={1} height="100%" justifyContent="center" bgcolor={"white"}>
      <Typography variant="h4">Welcome To Whatsapp-clone!</Typography>
      <Typography variant="h5" color="GrayText">
        Select a contact to begin chatting
      </Typography>
    </Stack>
  );
};
const RightScreenContents = () => {
  const [miniRoute, setMiniRoute] = useState("/");
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  useEffect(() => {
    switch (miniRoute) {
      case "/":
        if (selectedProfile) {
          setMiniRoute("/chat");
        }
        break;
      case "/chat":
        break;
      case "/profile":
        break;
    }
  }, [selectedProfile, miniRoute]);
  switch (miniRoute) {
    case "/chat":
      return <Chat />;
    case "/profile":
      return <Profile />;
    case "/":
    default:
      return <WelcomeElements />;
  }
};

const Auth = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: userData } = useQueryFirebaseUserData();
  const userSessionValid = useAppSelector(
    (state) => state.Quickblox.userSessionValid
  );
  const { mutateAsync: signOutMutation } = useMutationLogout();
  const { mutateAsync: updateProfileMutation } = useMutationUpdateProfile();
  const { emailVerified, email, displayName } = userData || {};
  const [nameInput, setNameInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  console.log("!!!userData", userData);
  if (!userData) {
    return <></>;
  }
  if (!displayName && false) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ maxWidth: "400px", padding: 4 }}>
          <Typography variant="h6">Finish setting up your profile</Typography>
          <FormHelperText>Enter your name</FormHelperText>
          <FormControl error={false}>
            <TextField
              fullWidth
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              placeholder="Full name"
              variant="filled"
            />
            {false && <FormHelperText>Enter your name</FormHelperText>}
          </FormControl>
          <Typography>Logout</Typography>
        </Card>
      </Box>
    );
  }
  function onTrySendEmailVerify() {
    updateProfileMutation(
      { displayName: nameInput },
      {
        onSuccess: async () => {
          if (email) {
            try {
              await FirebaseActions.sendAuthLinkToEmail(email);
              setEmailSent(true);
            } catch (e) {}
          }
        },
      }
    );
  }
  if (!displayName) {
    return (
      <Box
        display="flex"
        flexDirection={"column"}
        width={"100%"}
        alignItems={"center"}
      >
        <Card sx={{ maxWidth: "400px", p: 4 }}>
          <Stack
            alignItems={"center"}
            justifyContent="space-evenly"
            spacing={4}
          >
            <div>
              <AppLogo width="100px" />
              <Typography>
                {displayName ? `Hello ${displayName}` : email}
              </Typography>

              <FormHelperText sx={{ textAlign: "center" }}>
                Finish setting up your account
              </FormHelperText>
            </div>

            {!displayName && (
              <Box sx={{ width: "100%" }}>
                <FormHelperText>What do we call you?</FormHelperText>

                <TextField
                  fullWidth
                  inputProps={{
                    style: {
                      paddingBottom: 0,
                      paddingTop: 0,
                      margin: 0,
                      height: "40px",
                    },
                  }}
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                  }}
                  placeholder="username"
                  variant="filled"
                />

                {false && <FormHelperText>Enter your name</FormHelperText>}
              </Box>
            )}
            <div>
              <Button
        
                disabled={!nameInput && !displayName}
                variant="contained"
                onClick={onTrySendEmailVerify}
                sx={{ textTransform: "none" }}
              >
                {emailSent ? `Verification Sent` : `Finish sign-up`}
              </Button>
            </div>
          </Stack>
        </Card>
        <Box>
          <FormLabel>Not you?</FormLabel>
          <Button
            onClick={() => {
              if (email) {
                signOutMutation(null, {
                  onSuccess: () => {
                    navigate("/");
                  },
                });
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    );
  }
  if (!emailVerified) {
    return (
      <>
        <div>
          <AppLogo width="100px" />

          <Typography>Verify your email address</Typography>
          <FormHelperText sx={{ textAlign: "center" }}>
            We've sent a verification link to {email}
          </FormHelperText>
        </div>
        <Button
          variant="text"
          onClick={() => {
            if (email) {
              FirebaseActions.sendAuthLinkToEmail(email);
            }
          }}
        >
          Resend Email Verification
        </Button>
        <Box>
          <FormLabel>Not you?</FormLabel>
          <Button
            onClick={() => {
              if (email) {
                signOutMutation(null, {
                  onSuccess: () => {
                    navigate("/");
                  },
                });
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      {userSessionValid ? (
        <Stack
          direction="column"
          sx={{
            width: "100vw",
            height: window.innerHeight,
            overflow: "clip",
          }}
        >
          <Grid direction="row" container sx={{ height: "100%" }}>
            <Grid
              item
              xs={3.5}
              sx={{
                borderWidth: 0,
                borderRightWidth: 0.5,
                borderRightColor: theme.palette.secondary.light,
                borderStyle: "solid",
                height: "100%",
              }}
            >
              <Contacts />
            </Grid>
            <Grid item xs={8.5} sx={{ height: "100%" }}>
              <RightScreenContents />
            </Grid>
          </Grid>
        </Stack>
      ) : (
        <Stack
          sx={{
            height: window.outerHeight / 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppLogo width={"400px"} />
          <CircularProgress />
          <Typography color="white" fontSize="18px">
            Please wait while we prepare your data
          </Typography>
        </Stack>
      )}
    </>
  );
};
export default Auth;
