import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  OutlinedInput,
  Popover,
  Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
  FilterList,
  Notifications,
  PersonAdd,
  Search,
  Settings,
} from "@mui/icons-material";
import { RequestsModal } from "../../Containers/RequestsModal";
import { AddContactModal } from "../../Containers/AddContactModal";
import { colorHelper, theme } from "../../Theme";

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
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.palette.secondary.main,
          height: "60px",
        }}
      >
        <Box>
          <ButtonBase sx={{ p: 1 }}>
            <Settings
              sx={{
                color: colorHelper.lightenColor("secondaryMain", 0.6),
              }}
            />
          </ButtonBase>
        </Box>
        <Box>
          <Tooltip title="Add new contact">
            <ButtonBase onClick={handleToggleAddContactModal}>
              <PersonAdd
                fontSize="large"
                sx={{
                  color: colorHelper.lightenColor("secondaryMain", 0.6),
                }}
              />
            </ButtonBase>
          </Tooltip>
          <Tooltip title="Notifications">
            <ButtonBase onClick={handleToggleRequestsModal}>
              <Notifications
                fontSize="large"
                sx={{
                  color: colorHelper.lightenColor("secondaryMain", 0.6),
                }}
              />
            </ButtonBase>
          </Tooltip>
        </Box>
      </Stack>
      <Stack
        direction="row"
        p="4px"
        sx={{ backgroundColor: theme.palette.secondary.dark }}
      >
        <OutlinedInput
          color="secondary"
          fullWidth
          style={{
            marginLeft: 10,
            height: 40,
            borderRadius: 10,
            backgroundColor: colorHelper.lightenColor("secondaryLight", 0.4),
          }}
          value={input}
          onChange={(e) => {
            const updateVal = e.target.value;
            setInput(updateVal);
          }}
          startAdornment={
            <Search
              sx={{ color: colorHelper.darkenColor("secondaryLight", 0.4) }}
            />
          }
        />
        <Tooltip title="filter">
          <ButtonBase
            sx={{
              px: 1,
              color: colorHelper.lightenColor("secondaryLight", 0.4),
            }}
          >
            <FilterList />
          </ButtonBase>
        </Tooltip>
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
    </>
  );
};
export default SearchBar;
