import React from "react";
import { Avatar, Button, ButtonBase, Typography } from "@mui/material";
import { Stack } from "@mui/system";
const profilepic =
  "https://www.thesun.co.uk/wp-content/uploads/2022/05/309E522E-D141-11EC-BE62-1280C3EF198F.jpeg";

const FriendRequestButtons = ({
  onReject,
  onAccept,
}: {
  onReject: () => void;
  onAccept: () => void;
}) => {
  return (
    <Stack spacing={1} direction={"row"}>
      <Button
        sx={{
          paddingY: 0.5,
          backgroundColor: "lightgray",
          ":hover": {
            backgroundColor: "lightgray",
          },
          color: "black",
          textTransform: "none",
          boxShadow: "0",
          fontWeight: "bold",
        }}
        variant="contained"
        onClick={onReject}
      >
        Reject
      </Button>
      <Button
        sx={{
          paddingY: 0.5,
          backgroundColor: "steelblue",
          color: "white",
          textTransform: "none",
          boxShadow: "0",
          fontWeight: "bold",
          ":hover": {
            backgroundColor: "steelblue",
          },
        }}
        variant="contained"
        onClick={onAccept}
      >
        Accept
      </Button>
    </Stack>
  );
};
const ContactListItem = ({
  item,
  onClick = () => {},
  variant = "",
  onAccept = () => {},
  onReject = () => {},
}: {
  item: TypeDataEntityQbUser | null;
  onClick?: (a?: any) => void;
  variant?: "request" | "";
  onAccept?: (a?: any) => void;
  onReject?: (a?: any) => void;
}) => {
  const { full_name, email } = item || {};
  if (!full_name) {
    return <></>;
  }
  const fullname = full_name;
  return (
    <ButtonBase
      sx={{
        justifyContent: "flex-start",
        ":hover": { backgroundColor: "Highlight", borderRadius: 2 },
      }}
      onClick={onClick}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Avatar alt={fullname} src={profilepic} sx={{ margin: 1 }} />
        <Stack flex={1}>
          <Typography lineHeight={1} textAlign={"left"} fontWeight={"bold"}>
            {fullname}
          </Typography>
          <Typography lineHeight={1} textAlign={"left"}>
            {email}
          </Typography>
        </Stack>
        {variant === "request" && (
          <FriendRequestButtons
            {...{
              onAccept: () => onAccept(item),
              onReject: () => onAccept(item),
            }}
          />
        )}
      </Stack>
    </ButtonBase>
  );
};
export default ContactListItem;
