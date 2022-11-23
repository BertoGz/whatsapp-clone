import React, { useState } from "react";
import { ButtonBase, OutlinedInput, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import {
  Notifications,
  PersonAdd,
  Search,
  Settings,
} from "@mui/icons-material";
import { RequestsModal } from "../../Containers/RequestsModal";
import { AddContactModal } from "../../Containers/AddContactModal";
import { colorHelper } from "../../Theme";

let modalOpen = "";
const SearchBar = () => {
  const [input, setInput] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function handleToggleRequestsModal(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (anchorEl) {
      setAnchorEl(null);
      modalOpen = "";
      return;
    }
    modalOpen = "requests";
    setAnchorEl(event.currentTarget);
  }
  function handleToggleAddContactModal(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (anchorEl) {
      setAnchorEl(null);
      modalOpen = "";
      return;
    }
    modalOpen = "addContact";
    setAnchorEl(event.currentTarget);
  }
  return (
    <>
      <ButtonBase sx={{ alignSelf: "flex-start" }}>
        <Settings
          sx={{
            color: colorHelper.lightenColor('secondaryMain', 0.6),
          }}
        />
      </ButtonBase>
      <Stack
        direction="column"
        alignItems="flex-end"
        spacing={2}
        sx={{ paddingX: 2, pt: 2 }}
      >
        <OutlinedInput
          color="secondary"
          fullWidth
          style={{
            height: 40,
            borderRadius: 10,
          }}
          value={input}
          onChange={(e) => {
            const updateVal = e.target.value;
            setInput(updateVal);
          }}
          startAdornment={<Search color="primary" />}
        />

        <Stack direction="row" spacing={1}>
          <ButtonBase onClick={handleToggleAddContactModal}>
            <PersonAdd
              fontSize="large"
              sx={{
                color: colorHelper.lightenColor(
                  'secondaryMain',
                  0.6
                ),
              }}
            />
          </ButtonBase>
          <ButtonBase onClick={handleToggleRequestsModal}>
            <Notifications
              fontSize="large"
              sx={{
                color: colorHelper.lightenColor(
                  'secondaryMain',
                  0.6
                ),
              }}
            />
          </ButtonBase>
        </Stack>
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
          {modalOpen === "requests" && <RequestsModal />}
          {modalOpen === "addContact" && <AddContactModal />}
        </Popover>
      </Stack>
    </>
  );
};
export default SearchBar;
