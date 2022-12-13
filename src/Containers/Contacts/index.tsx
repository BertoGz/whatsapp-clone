import React from "react";
import { Stack } from "@mui/system";
import ContactList from "../../Components/ContactList";
import SearchBar from "../../Components/SearchBar";
import { useQueryContacts } from "../../ReactQuery/Queries/useQueryContacts";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const { data: contacts, isLoading } = useQueryContacts();

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: theme.palette.secondary.light,
        borderRight: 2,
        borderColor: theme.palette.divider,
      }}
    >
      <div>
        <SearchBar />

        {
          <ContactList
            data={contacts ?? []}
            {...{ loading: isLoading || contacts === undefined }}
          />
        }
      </div>
    </Stack>
  );
};
export default Contacts;
