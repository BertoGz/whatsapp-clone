import {
  Box,
  CircularProgress,
  Drawer,
  Typography,
  useTheme,
} from "@mui/material";
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
import { maxScreenHeight } from "../../Contants";
import { setHamburgerIsOpen } from "../../Redux/AppState";
import { useAppDispatch } from "../../Redux/useAppDispatch";
import { MobileHeader } from "../../Components/MobileHeader";

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
        Welcome To HowAreU!
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
  const AppDrawer = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.AppState.hamburgerIsOpen);
    return (
      <>
        <Drawer
          className="mobile-view-only"
          sx={{ zIndex: 1000 }}
          PaperProps={{}}
          anchor="left"
          open={isOpen}
          onClose={() => {
            dispatch(setHamburgerIsOpen(false));
          }}
        >
          <Box
            minWidth={"300px"}
            sx={{
              borderWidth: 0,
              borderRightWidth: 0.5,
              borderRightColor: theme.palette.secondary.light,
              borderStyle: "solid",
              height: "100%",
            }}
          >
            <Contacts />
          </Box>
        </Drawer>
      </>
    );
  };

  return (
    <>
      {userSessionValid ? (
        <Stack direction="column" height={maxScreenHeight}>
          <MobileHeader />
          <Stack
            display="flex"
            direction="row"
            sx={{ width: "100vw", height: "100%" }}
          >
            <AppDrawer />
            <Box
              className="desktop-view-only"
              minWidth={"300px"}
              sx={{
                borderWidth: 0,
                borderRightWidth: 0.5,
                borderRightColor: theme.palette.secondary.light,
                borderStyle: "solid",
                height: "100%",
              }}
            >
              <Contacts />
            </Box>

            <Box width="100%">
              <RightScreenContents />
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Stack
          sx={{
            height: window.outerHeight / 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppLogo width={`${Math.min(300, window.innerWidth / 1.3)}px`} />
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
