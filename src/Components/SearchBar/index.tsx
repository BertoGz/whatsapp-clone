import React, { useState } from "react";
import { ButtonBase, OutlinedInput, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import { AddBox, Notifications, Search } from "@mui/icons-material";
import { RequestsModal } from "../../Containers/RequestsModal";
import { AddContactModal } from "../../Containers/AddContactModal";

let modalOpen = ''
const SearchBar = () => {
  const [input, setInput] = useState("");
  //const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function handleToggleRequestsModal(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (anchorEl) {
      setAnchorEl(null);
      modalOpen ='' ;
      return;
    }
    modalOpen = 'requests'
    setAnchorEl(event.currentTarget);
  }
  function handleToggleAddContactModal(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (anchorEl) {
      setAnchorEl(null);
      modalOpen = '';
      return;
    }
    modalOpen = 'addContact'
    setAnchorEl(event.currentTarget);
  }
  return (
    <Stack direction="row" alignItems="center">
      <OutlinedInput
        id="outlined-basic"
        label="Outlined"
        value={input}
        onChange={(e) => {
          const updateVal = e.target.value;
          setInput(updateVal);
        }}
        startAdornment={<Search />}
      />
      <ButtonBase onClick={handleToggleAddContactModal}>
        <AddBox color="action" />
      </ButtonBase>
      <ButtonBase onClick={handleToggleRequestsModal}>
        <Notifications color="warning" />
      </ButtonBase>

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
        {modalOpen === 'requests' && <RequestsModal />}
        {modalOpen === 'addContact' && <AddContactModal />}
      </Popover>
    </Stack>
  );
};
export default SearchBar;
