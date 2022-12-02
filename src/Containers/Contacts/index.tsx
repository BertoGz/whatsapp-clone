import React from "react";
import { Stack } from "@mui/system";
import ContactList from "../../Components/ContactList";
import SearchBar from "../../Components/SearchBar";
import { useQueryContacts } from "../../ReactQuery/Queries/useQueryContacts";
import { Button, useTheme } from "@mui/material";
import { useMutationLogout } from "../../ReactQuery/Mutations/useMutationLogout";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: contacts, isLoading } = useQueryContacts();

  const { mutateAsync: signOutMutation } = useMutationLogout();
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

        {<ContactList data={contacts ?? []} {...{ loading: isLoading || contacts === undefined }} />}
      </div>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          signOutMutation(null, {
            onSuccess: () => {
              navigate("/");
            },
          });
        }}
        sx={{
          m: 2,
          color: theme.palette.getContrastText(theme.palette.secondary.dark),
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};
export default Contacts;
