import React, { useState } from "react";
import {
  ButtonBase,
  OutlinedInput,
  Popover,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  Notifications,
  PersonAdd,
  Search,
  Settings,
} from "@mui/icons-material";
import { RequestsModal } from "../../Containers/RequestsModal";
import { AddContactModal } from "../../Containers/AddContactModal";

let modalOpen = "";
const SearchBar = () => {
  const theme = useTheme();
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
        <Settings color="secondary" />
      </ButtonBase>
      <Stack
        direction="column"
        alignItems="flex-end"
        spacing={2}
        sx={{ paddingX: 2 , pt: 2 }}
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
          startAdornment={<Search color="secondary" />}
        />

        <Stack direction="row" spacing={1}>
          <ButtonBase onClick={handleToggleAddContactModal}>
            <PersonAdd fontSize="large" color="secondary" />
          </ButtonBase>
          <ButtonBase onClick={handleToggleRequestsModal}>
            <Notifications fontSize="large" color="secondary" />
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
