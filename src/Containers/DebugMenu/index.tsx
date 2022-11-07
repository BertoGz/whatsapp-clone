import { Bolt } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormHelperText,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { PressableText } from "../../Components/ClickableText";
import { PromisedQb } from "../../Quickblox";

const DebugMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [removeRosterInput, setRemoveRosterInput] = useState("");
  function onTryDisconnectChat() {
    PromisedQb.chatDisconnect();
  }
  function handleToggleModal(event: React.MouseEvent<HTMLButtonElement>) {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(event.currentTarget);
  }
  function tryRemoveFriend() {
    PromisedQb.removeFromRoster(parseInt(removeRosterInput, 10));
  }

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "GrayText",
          pointerEvents: "all",
          px: 1,
        }}
      >
        <PressableText onClick={handleToggleModal}>Debug Menu</PressableText>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Paper sx={{ p: 2, backgroundColor: "GrayText" }}>
          <Stack direction="row">
            <FormHelperText>(Dev) Debug Menu</FormHelperText>
            <Bolt />
          </Stack>
          <Stack sx={{ m: 1, alignItems: "flex-start" }} direction={"column"}>
            <PressableText onClick={onTryDisconnectChat}>
              Disconnect Quickblox Chat
            </PressableText>
            <Stack direction="row">
              <TextField
                value={removeRosterInput}
                onChange={(e) => {
                  setRemoveRosterInput(e.target.value);
                }}
              />
              <PressableText onClick={tryRemoveFriend}>
                Remove Friend
              </PressableText>
            </Stack>
            <Divider variant="fullWidth" />
            <PressableText onClick={handleToggleModal}>
              Close Menu
            </PressableText>
          </Stack>
        </Paper>
      </Popover>
    </div>
  );
};
export default DebugMenu;
