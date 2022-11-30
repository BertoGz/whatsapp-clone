import React from "react";
import {
  Avatar,
  Button,
  ButtonBase,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ArrowForwardIos } from "@mui/icons-material";
import { useAppSelector } from "../../Redux/useAppSelector";
import { colorHelper } from "../../Theme";
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
  item: TypeDataEntityContact;
  onClick?: (a?: any) => void;
  variant?: "request" | "";
  onAccept?: (a?: any) => void;
  onReject?: (a?: any) => void;
}) => {
  const theme = useTheme();
  const contrastText = colorHelper.contrastText("secondaryMain");
  const highlightColor = colorHelper.lightenColor("secondaryMain", 0.001);
  const { user, dialog } = item || {};
  const { full_name, email, id } = user || {};
  const { last_message } = dialog || {};
  const selectedProfile = useAppSelector(
    (state) => state.AppState.selectedProfile
  );
  const isSelected = selectedProfile === id;
  if (!full_name) {
    return <></>;
  }
  const fullname = full_name;

  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        textTransform: "none",
        alignItems: "flex-start",
        flexDirection: "column",
        p: 0,
        m: 0,
        borderRadius: 0,
        outlineStyle: "none",
        backgroundColor: isSelected
          ? theme.palette.secondary.dark
          : theme.palette.secondary.light,
        ":hover": {
          backgroundColor: isSelected
            ? highlightColor
            : theme.palette.secondary.main,
        },
      }}
      onClick={onClick}
    >
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        height="60px"
        overflow={"hidden"}
      >
        <Avatar
          alt={fullname}
          src={profilepic}
          sx={{
            outlineStyle: "solid",
            outlineWidth: "2px",
            outlineColor: theme.palette.secondary.main,
            margin: 1,
          }}
        />
        <Stack
          sx={{ paddingRight: 1, height: "100%" }}
          flex={1}
          justifyContent="space-between"
        >
          <Stack sx={{ py: 1 }}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography
                lineHeight={1}
                textAlign={"left"}
                fontWeight={"bold"}
                sx={{
                  color: contrastText,
                }}
              >
                {fullname}
              </Typography>
              <Stack
                gap={1}
                direction="row"
                alignItems={"center"}
                sx={{
                  color: contrastText,
                }}
              >
                <Typography lineHeight={1}>9:33 AM</Typography>
                <ArrowForwardIos
                  sx={{ fontSize: "10px", color: contrastText }}
                />
              </Stack>
            </Stack>
            <Typography
              lineHeight={1.5}
              textAlign={"left"}
              variant="body2"
              whiteSpace="nowrap"
              sx={{
                color: contrastText,
              }}
            >
              {!last_message ? `Start messaging ${fullname}` : last_message}
            </Typography>
          </Stack>
          <Divider />
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
    </Button>
  );
};
export default ContactListItem;
