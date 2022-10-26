import {
  Box,
  Button,
  ButtonBase,
  Divider,
  FormLabel,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQueryUserData } from "../../ReactQuery/Queries/useQueryUserData";
import Contacts from "../Contacts";
import Profile from "../Profile";
import logo from "../../Files/logo.png";
import { FirebaseActions } from "../../Firebase";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const { data: userData } = useQueryUserData();
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
    <>
      <Stack direction="row" divider={<Divider />}>
        <Contacts />
        <Profile />
      </Stack>
    </>
  );
};
export default Auth;
