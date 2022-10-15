import React from "react";
import {
  Avatar,
  ButtonBase,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

const ContactListItem = ({
  item,
  onClick,
}: {
  item: TypeDataEntityContact;
  onClick: () => void;
}) => {
  const { profilepic, firstname, lastname, role } = item || {};
  if (!firstname) {
    return <></>;
  }
  const fullname = `${firstname} ${lastname}`;
  return (
    <ButtonBase sx={{ justifyContent: "flex-start" }} onClick={onClick}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        spacing={1}
      >
        <Avatar alt={fullname} src={profilepic} sx={{ margin: 1 }} />
        <Stack flex={1}>
          <Typography textAlign={"left"} fontWeight={"bold"}>
            {fullname}
          </Typography>
          <Typography textAlign={"left"} color="GrayText">{role}</Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
};
export default ContactListItem;
