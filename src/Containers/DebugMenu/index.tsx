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
import { clientData, useMutationUpdateRelationship } from "../../ReactQuery";
import { devDeleteDialog } from "../../Requests";

const DebugMenu = () => {
  const { mutateAsync: updateRelationshipMutation } =
    useMutationUpdateRelationship();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [debugInput, setDebugInput] = useState("");
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
    const contacts = clientData.getContacts();
    const user = contacts?.find(
      (contact) => contact?.user.id === parseInt(debugInput, 10)
    );
    if (!user) {
      return Promise.reject("no user found to remove");
      // console.log("no user found");
      //return;
    }

    updateRelationshipMutation({
      relationship_id: user.relationship.relationship_id,
      status: -1,
    });
  }
  async function tryDevDeleteDialog() {
    new Promise(async (res, rej) => {
      try {
        const response = await devDeleteDialog({
          relationship_id: parseInt(debugInput, 10),
        });
        res(response);
      } catch (e) {
        rej(e);
      }
    })
      .then((s) => console.log("dialog deleted!", s))
      .catch((e) => console.log("dialog delete error", e));
  }
  function handleLogQbSession() {
    console.log("!!@@qbSession", PromisedQb.getSessionUser());
  }
  //return <></>;
  return (
    <>
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
            <Stack direction="column" sx={{ border: 1 }}>
              <TextField
                value={debugInput}
                onChange={(e) => {
                  setDebugInput(e.target.value);
                }}
              />

              <PressableText onClick={tryRemoveFriend}>
                Remove Friend (user.id)
              </PressableText>
              <PressableText onClick={tryDevDeleteDialog}>
                Delete Dialog (relationship.id)
              </PressableText>
            </Stack>
            <Divider variant="fullWidth" />
            <PressableText onClick={handleLogQbSession}>
              Log QB session
            </PressableText>
            <PressableText onClick={handleToggleModal}>
              Close Menu
            </PressableText>
          </Stack>
        </Paper>
      </Popover>
    </>
  );
};
export default DebugMenu;
