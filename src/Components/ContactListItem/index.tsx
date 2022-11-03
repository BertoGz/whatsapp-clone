import React from "react";
import {
  Avatar,
  ButtonBase,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
const profilepic = "https://www.thesun.co.uk/wp-content/uploads/2022/05/309E522E-D141-11EC-BE62-1280C3EF198F.jpeg"
const ContactListItem = ({
  item,
  onClick,
}: {
  item: TypeDataEntityQbUser;
  onClick: () => void;
}) => {
  const { full_name, email } = item || {};
  if (!full_name) {
    return <></>;
  }
  const fullname = full_name
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
          <Typography textAlign={"left"} color="GrayText">{email}</Typography>
        </Stack>
      </Stack>
    </ButtonBase>
  );
};
export default ContactListItem;
