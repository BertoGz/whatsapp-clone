import React from 'react'
import { Stack } from "@mui/system";
import ContactList from "../../Components/ContactList";
import SearchBar from "../../Components/SearchBar";
import { useQueryContacts } from "../../ReactQuery/Queries/useQueryContacts";

const Contacts = () => {
  const { data } = useQueryContacts();


  return (
    <Stack>
      <SearchBar />
      <ContactList />
    </Stack>
  );
};
export default Contacts;
