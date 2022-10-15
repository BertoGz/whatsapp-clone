import { Stack } from "@mui/system";
import React from "react";
import { users } from "../../Data";
import { setSelectedProfile } from "../../Redux/AppState";
import { useAppDispatch } from "../../Redux/useAppDispatch";
import ContactListItem from "../ContactListItem";

const ContactList = () => {
  const dispatch = useAppDispatch();
  function onClick(user_id: number) {
    dispatch(setSelectedProfile(user_id));
  }
  return (
    <Stack direction={'column'} flex={1}>
      {users.map((item) => (
        <ContactListItem
          {...{ item }}
          onClick={() => {
            onClick(item.user_id);
          }}
        />
      ))}
    </Stack>
  );
};
export default ContactList;
