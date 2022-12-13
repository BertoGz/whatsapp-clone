import { Box, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import { setHamburgerIsOpen, setSelectedProfile } from "../../Redux/AppState";
import { useAppDispatch } from "../../Redux/useAppDispatch";
import { colorHelper } from "../../Theme";
import ContactListItem from "../ContactListItem";

const ContactList = ({
  data = [],
  loading = false,
}: {
  data: Array<TypeDataEntityContact | null> | undefined;
  loading: boolean;
}) => {
  const dispatch = useAppDispatch();
  function onClick(contact: TypeDataEntityContact) {
    dispatch(setSelectedProfile(contact?.user.id));
    dispatch(setHamburgerIsOpen(false));
  }
  const subscribedUsers = useMemo(() => {
    return data; // return data.filter((user) => user?.friend.subscription !== "none");
  }, [data]);

  if (loading) {
    return (
      <>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          height="100%"
        >
          <CircularProgress sx={{ mt: 2 }} />
        </Box>
      </>
    );
  }
  if (subscribedUsers.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        height="100%"
      >
        <Typography
          variant="h6"
          sx={{ color: colorHelper.lightenColor("secondaryLight", 0.4) }}
          textAlign={"center"}
          maxWidth="300px"
        >
          This is your contact list. Connected users will be found here.
        </Typography>
      </Box>
    );
  }
  return (
    <Stack direction={"column"} sx={{ backgroundColor: "white" }}>
      {subscribedUsers.map((item) => {
        if (!item) {
          return <></>;
        }
        return (
          <ContactListItem
            {...{ item }}
            onClick={() => {
              onClick(item);
            }}
          />
        );
      })}
    </Stack>
  );
};
export default ContactList;
