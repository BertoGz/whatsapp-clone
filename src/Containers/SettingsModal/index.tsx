import { Avatar, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { profilepic } from "../../Contants";
import { useQueryFirebaseUserData } from "../../ReactQuery";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { theme } from "../../Theme";

export const SettingsModal = () => {
  const { mutateAsync: signOutMutation } = useMutationLogout();
  const navigate = useNavigate();
  const { data } = useQueryFirebaseUserData();
  const { displayName } = data || {};
  return (
    <Stack alignItems={'center'} p={2}>
      <Avatar
        alt={displayName || ''}
        src={profilepic}
        sx={{
          outlineStyle: "solid",
          outlineWidth: "2px",
          outlineColor: theme.palette.secondary.main,
          margin: 1,
        }}
      />
      <Typography>{displayName}</Typography>
      <Button
        variant="contained"

        onClick={() => {
          signOutMutation(null, {
            onSuccess: () => {
              navigate("/");
            },
          });
        }}
        sx={{
          m: 2,
          color: theme.palette.getContrastText(theme.palette.primary.main),
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};
