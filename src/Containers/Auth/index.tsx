import {
  Box,
  Button,
  FormLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryFirebaseUserData } from "../../ReactQuery";
import Contacts from "../Contacts";
import Profile from "../Profile";
import logo from "../../Files/logo.png";
import { FirebaseActions } from "../../Firebase";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Chat from "../Chat";
import { useAppSelector } from "../../Redux/useAppSelector";

const WelcomeElements = () => {
  return (
    <Stack flex={1} height="100vh" justifyContent="center">
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
  const { mutateAsync: signOutMutation } = useMutationLogout();
  const { emailVerified, email } = userData || {};
  console.log("!!!userData", userData);
  if (!userData) {
    return <></>;
  }
  if (!emailVerified) {
    return (
      <>
        <Stack alignItems={"center"} justifyContent="space-evenly" spacing={4}>
          <Box>
            <Box sx={{ alignItems: "center", justifyItems: "center" }}>
              <img
                src={logo}
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Typography variant="h4">Verify your account</Typography>
          </Box>
          <Stack direction={"column"}>
            <FormLabel>{email}</FormLabel>
            <Button
              variant="text"
              onClick={() => {
                if (email) {
                  FirebaseActions.sendAuthLinkToEmail(email);
                }
              }}
            >
              Send Email Verification
            </Button>
          </Stack>
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
        </Stack>
      </>
    );
  }
  return (
    <Stack direction="column">
      <Grid direction="row" container>
        <Grid
          item
          xs={3}
          sx={{
            borderWidth: 0,
            borderRightWidth: 2,
            borderRightColor: theme.palette.secondary.main,
            borderStyle: "solid",
          }}
        >
          <Contacts />
        </Grid>
        <Grid item xs={9}>
          <RightScreenContents />
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          if (email) {
            //  debugger
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
    </Stack>
  );
};
export default Auth;
