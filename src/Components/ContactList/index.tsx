import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";

//import { users } from "../../Data";
import { setSelectedProfile } from "../../Redux/AppState";
import { useAppDispatch } from "../../Redux/useAppDispatch";
import ContactListItem from "../ContactListItem";

const ContactList = ({
  data = [],
}: {
  data: Array<TypeDataEntityContact | null>;
}) => {
  const dispatch = useAppDispatch();
  function onClick(user: TypeDataEntityContact) {
    dispatch(setSelectedProfile(user.id));
  }

  const subscribedUsers = useMemo(() => {
    return data; // return data.filter((user) => user?.friend.subscription !== "none");
  }, [data]);

  if (subscribedUsers?.length === 0) {
    return (
      <>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography variant="h5" color="white" textAlign={"center"}>
            Connected users will appear here.
          </Typography>
        </Box>
      </>
    );
  }
  return (
    <Stack direction={"column"} flex={1}>
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
