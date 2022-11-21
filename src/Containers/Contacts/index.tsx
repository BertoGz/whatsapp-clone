import React from "react";
import { Stack } from "@mui/system";
import ContactList from "../../Components/ContactList";
import SearchBar from "../../Components/SearchBar";
import { useQueryContacts } from "../../ReactQuery/Queries/useQueryContacts";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const { data: contacts } = useQueryContacts();
  console.log("!!@@cacacacaacacaca", contacts);
  return (
    <Stack

      sx={{
        minHeight: "100vh",
      }}
    >
      <Stack
        direction="column"
        sx={{
          p: 1,
          borderBottom: 1,
          borderBottomColor: theme.palette.divider,
        }}
      >
        <SearchBar />
      </Stack>
      { <ContactList data={contacts ?? []} />}
    </Stack>
  );
};
export default Contacts;
