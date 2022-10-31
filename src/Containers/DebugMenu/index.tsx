import { Bolt } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  FormHelperText,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { PressableText } from "../../Components/ClickableText";
import { PromisedQb } from "../../Quickblox";

const DebugMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        pointerEvents: "none",
      }}
    >
      <Button
        onClick={handleToggleModal}
        sx={{ opacity: 0.5, pointerEvents: "all" }}
        variant="contained"
      >
        Debug Menu
      </Button>
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
        <Paper sx={{ p: 2, backgroundColor: "rgb(150,150,150)" }}>
          <Stack direction="row">
            <FormHelperText>(Dev) Debug Menu</FormHelperText>
            <Bolt />
          </Stack>
          <Stack sx={{ m: 1, alignItems: "flex-start" }} direction={"column"}>
            <PressableText onClick={onTryDisconnectChat}>
              Disconnect Quickblox Chat
            </PressableText>
            <Divider variant="fullWidth"  />
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
