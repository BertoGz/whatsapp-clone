import { Stack } from "@mui/system";
import React from "react";
import ContactList from "../../Components/ContactList";
import SearchBar from "../../Components/SearchBar";

const Contacts = () => {
  return (
    <Stack>
      <SearchBar />
      <ContactList />
    </Stack>
  );
};
export default Contacts;
