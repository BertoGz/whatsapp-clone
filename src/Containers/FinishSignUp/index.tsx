import {
  Box,
  Button,
  Card,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryFirebaseUserData } from "../../ReactQuery";

import { FirebaseActions } from "../../Firebase";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { AppLogo } from "../../Components/AppLogo";

import { useMutationUpdateProfile } from "../../ReactQuery/Mutations/useMutationUpdateProfile";

const FinishSignUp = () => {
  const navigate = useNavigate();
  const { data: userData } = useQueryFirebaseUserData();

  const { mutateAsync: signOutMutation } = useMutationLogout();
  const { mutateAsync: updateProfileMutation } = useMutationUpdateProfile();
  const { emailVerified, email, displayName } = userData || {};
  const [nameInput, setNameInput] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  console.log("!!!userData", userData);
  if (!userData) {
    return <></>;
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
  return <></>;
};
export default FinishSignUp;
