//components
import ButtonAppBar from "./AppBar";
import InputThread from "./InputThread";
import ListThreads from "./ListThreads";

import { Stack } from "@mui/material";
import { Fragment } from "react";

function ThreadListingPage() {
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

export default ThreadListingPage;
