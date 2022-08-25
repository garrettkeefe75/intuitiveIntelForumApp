import React, { Fragment } from "react";
import AppBar from "./components/AppBar";
import "./App.css";
import { Stack } from "@mui/material";

//components
import InputThread from "./components/InputThread";
import ListThreads from "./components/ListThreads";

function App() {
  return (
    <Fragment>
      <Stack spacing={3}>
        <AppBar />
        <InputThread />
        <ListThreads />
      </Stack>
    </Fragment>
  );
}

export default App;
