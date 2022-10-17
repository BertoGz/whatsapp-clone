import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import Contacts from "../Contacts";
import Profile from "../Profile";

const Auth = () => {
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
