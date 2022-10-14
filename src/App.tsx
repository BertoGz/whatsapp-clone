import React from "react";
import { Divider } from "@mui/material";
import "./App.css";
import Contacts from "./Containers/Contacts";
import Profile from "./Containers/Profile";
import { Stack } from "@mui/system";

function App() {
  return (
    <div className="App">
      <Stack direction="row" divider={<Divider />}>
        <Contacts />
        <Profile />
      </Stack>
    </div>
  );
}

export default App;
