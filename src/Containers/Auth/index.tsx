import { CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryFirebaseUserData } from "../../ReactQuery";
import Contacts from "../Contacts";
import Profile from "../Profile";
import { useEffect, useState } from "react";
import Chat from "../Chat";
import { useAppSelector } from "../../Redux/useAppSelector";
import { AppLogo } from "../../Components/AppLogo";

import FinishSignUp from "../FinishSignUp";
import { colorHelper } from "../../Theme";

const WelcomeElements = () => {
  const theme = useTheme();
  return (
    <Stack
      flex={1}
      height="100%"
      justifyContent="center"
      bgcolor={theme.palette.secondary.dark}
    >
      <Typography
        variant="h4"
        color={colorHelper.contrastText("secondaryDark")}
      >
        Welcome To Whatsapp-clone!
      </Typography>
      <Typography
        variant="h5"
        color={colorHelper.contrastText("secondaryDark")}
      >
        Select a contact to begin chatting
      </Typography>
    </Stack>
  );
};
const RightScreenContents = () => {
  const [miniRoute, setMiniRoute] = useState("");
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  useEffect(() => {
    switch (miniRoute) {
      case "":
        if (selectedProfile) {
          setMiniRoute("chat");
        }
        break;
      case "chat":
        break;
      case "profile":
        break;
    }
  }, [selectedProfile, miniRoute]);
  switch (miniRoute) {
    case "chat":
      return <Chat />;
    case "profile":
      return <Profile />;
    case "":
    default:
      return <WelcomeElements />;
  }
};

const Auth = () => {
  const theme = useTheme();

  const { data: userData } = useQueryFirebaseUserData();
  const userSessionValid = useAppSelector(
    (state) => state.Quickblox.userSessionValid
  );

  const { emailVerified, displayName } = userData || {};

  console.log("!!!userData", userData);
  if (!userData) {
    return <></>;
  }
  if (!emailVerified || !displayName) {
    return <FinishSignUp />;
  }

  return (
    <>
      {userSessionValid ? (
        <Stack
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
