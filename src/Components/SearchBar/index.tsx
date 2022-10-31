import React, { useState } from "react";
import {
  ButtonBase,
  OutlinedInput,
  Popover,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Add, AddBox, Notifications, Search } from "@mui/icons-material";
import { RequestsModal } from "../../Containers/RequestsModal";

const SearchBar = () => {
  const [input, setInput] = useState("");
  //const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  function handleToggleRequestsModal(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }
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
      <ButtonBase>
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
        <RequestsModal />
      </Popover>
    </Stack>
  );
};
export default SearchBar;
