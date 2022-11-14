import {
  Box,
  Button,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryFirebaseUserData } from "../../ReactQuery";
import Contacts from "../Contacts";
import Profile from "../Profile";
import logo from "../../Files/logo.png";
import { FirebaseActions } from "../../Firebase";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { useNavigate } from "react-router-dom";
const Auth = () => {
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
      <Grid direction="row" container >
        <Grid item xs={3} minWidth={250}>
          <Contacts />
        </Grid>
        <Grid item xs={8}>
          <Profile />
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
