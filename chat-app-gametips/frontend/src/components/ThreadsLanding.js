//components
import React, { useState, useEffect } from "react";
import ButtonAppBar from "./AppBar";
import InputThread from "./InputThread";
import ListThreads from "./ListThreads";
import InputTip from "./InputNewTip";

import { Stack, Box } from "@mui/material";
import { Fragment } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Button } from "@mui/material";
import TipsThreads from "./TipsThreads";

function ThreadListingPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState("Games");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const storeGameName = () => {
    setName("Games");
  };

  const storeTipsName = () => {
    setName("Tips");
  };

  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        {name === "Games" ? <InputThread /> : <InputTip />}

        <Box textAlign="center">
          <Button
            variant="contained"
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ width: 600, marginTop: "15px" }}
            style={{ backgroundColor: "gray" }}
          >
            Choose discussion for Games or Tips
          </Button>
        </Box>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              storeGameName();
            }}
          >
            Games
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              storeTipsName();
            }}
          >
            Tips
          </MenuItem>
        </Menu>
        {name === "Games" ? <ListThreads /> : <TipsThreads />}
      </Stack>
    </Fragment>
  );
}

export default ThreadListingPage;
