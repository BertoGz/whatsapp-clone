import React from "react";
import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const ContactListItem = ({ item }: { item: TypeDataEntityContact }) => {
  const { profilepic, firstname, lastname, role } = item || {};
  if (!firstname) {
    return <></>;
  }
  const fullname = `${firstname} ${lastname}`;
  return (
    <Stack direction="row" alignItems="center">
      <Avatar alt={fullname} src={profilepic} />
      <Stack>
        <Typography fontWeight={'bold'} textAlign='left'>{fullname}</Typography>
        <Typography textAlign='left'>{role}</Typography>
      </Stack>
    </Stack>
  );
};
export default ContactListItem;
