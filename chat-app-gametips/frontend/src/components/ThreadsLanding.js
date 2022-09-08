//components
import GuestButtonAppBar from "./GuestAppBar";
import ButtonAppBar from "./AppBar";
import InputThread from "./InputThread";
import ListThreads from "./ListThreads";

import { Stack } from "@mui/material";
import { Fragment } from "react";

function ThreadListingPage() {
  const loggedInUser = localStorage.getItem('user');
  if(loggedInUser){
    return (
      <Fragment>
        <Stack spacing={3}>
          <ButtonAppBar />
          <InputThread />
          <ListThreads />
        </Stack>
      </Fragment>
    ); 
  }
  return (
    <Fragment>
      <Stack spacing={3}>
        <GuestButtonAppBar />
        <InputThread />
        <ListThreads />
      </Stack>
    </Fragment>
  );
}

export default ThreadListingPage;
