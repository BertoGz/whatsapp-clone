import React from "react";
import { Stack } from "@mui/system";
import ContactList from "../../Components/ContactList";
import SearchBar from "../../Components/SearchBar";
import { useQueryContacts } from "../../ReactQuery/Queries/useQueryContacts";

const Contacts = () => {
  const { data } = useQueryContacts();
  const { items } = data || {};

  console.log("contacts data", data);
  return (
    <Stack bgcolor={"lightslategrey"} sx={{ minHeight: "100vh" }}>
      <SearchBar />
      <ContactList data={items ?? []} />
    </Stack>
  );
};
export default Contacts;
