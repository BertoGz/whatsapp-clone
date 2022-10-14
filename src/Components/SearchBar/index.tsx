import React, { useState } from "react";
import { ButtonBase, OutlinedInput } from "@mui/material";
import { Stack } from "@mui/system";
import { Add, Search } from "@mui/icons-material";

const SearchBar = () => {
  const [input, setInput] = useState("");
  return (
    <Stack direction="row" alignItems='center'>
      <OutlinedInput
        id="outlined-basic"
        label="Outlined"
        value={input}
        onChange={(e) => {
          const updateVal = e.target.value;
          setInput(updateVal);
        }}
        startAdornment={<Search/>}
      />
      <ButtonBase><Add /></ButtonBase>
    </Stack>
  );
};
export default SearchBar;
