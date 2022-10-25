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
const Auth = () => {
  const { data: userData } = useQueryUserData();
  const { emailVerified, email } = userData || {};
  console.log("!!!userData", userData);
  if (!userData) {
    return <></>;
  }
  if (!emailVerified) {
    return (
      <>
        <Stack alignItems={"center"}>
          <Box sx={{ alignItems: "center", justifyItems: "center" }}>
            <img
              src={logo}
              style={{
                width: "300px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography variant="h4">Verify your account</Typography>

          <Button
            variant="text"
            onClick={() => {
              if (email) {
                FirebaseActions.sendAuthLinkToEmail(email);
              }
            }}
          >
            Send Verification Link
          </Button>
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
