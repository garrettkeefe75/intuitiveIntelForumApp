//import * as React from "react";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

export default function ButtonAppBar() {
  const [ profile, setProfile ] = useState([]);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setProfile(loggedInUser);
    }
  }, []);

  const logOut = () => {
    setProfile(null);
    localStorage.clear();
    window.location.reload(false);
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Game Tips
          </Typography>
          <Button color="inherit" onClick={logOut}>Logout</Button>
          <Avatar alt={profile.name} src={profile.imageUrl}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
