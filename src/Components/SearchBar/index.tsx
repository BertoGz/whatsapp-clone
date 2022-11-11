import React, { useState } from "react";
import { Box, ButtonBase, OutlinedInput, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import { AddBox, Notifications, PersonAdd, Search } from "@mui/icons-material";
import { RequestsModal } from "../../Containers/RequestsModal";
import { AddContactModal } from "../../Containers/AddContactModal";

let modalOpen = "";
const SearchBar = () => {
  const [input, setInput] = useState("");
  //const [showRequestsModal, setShowRequestsModal] = useState(false);
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
    <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: 2 }}>
      <OutlinedInput
        fullWidth
        sx={{}}
        style={{ height: 40, borderRadius: 10, backgroundColor: "Background" }}
        value={input}
        onChange={(e) => {
          const updateVal = e.target.value;
          setInput(updateVal);
        }}
        startAdornment={<Search />}
      />

      <Stack direction="row" spacing={1}>
        <ButtonBase onClick={handleToggleAddContactModal}>
          <PersonAdd fontSize="medium" sx={{ color: "Background" }} />
        </ButtonBase>
        <ButtonBase onClick={handleToggleRequestsModal}>
          <Notifications fontSize="medium" sx={{ color: "Background" }} />
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
  );
};
export default SearchBar;
