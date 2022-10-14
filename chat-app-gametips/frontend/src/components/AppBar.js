import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function ButtonAppBar() {
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const clientId =
    "92924635618-jfp2hmchkrqlc6at7iakf4180jb4aeas.apps.googleusercontent.com";
  const navigate = useNavigate();
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
  }, []);

  const logOut = () => {
    setProfile(null);
    window.localStorage.clear();
    setLoggedIn(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  const navigateToViewThreads = () => {
    navigate("/chatRooms");
  };

  const navigateToViewTips = () => {
    navigate("/Tips");
  };

  const onSuccess = async (res) => {
    var possibleUser = [];
    const email = res.profileObj.email;
    try {
      const response1 = await fetch(
        "http://localhost:5000/getUser/".concat(email)
      );
      possibleUser = await response1.json();
    } catch (error) {
      console.log(error.message);
    }
    if (possibleUser.length === 0) {
      console.error("User doesn't exist");
      navigate("/signUp");
      return null;
    }
    const myObject = {
      user_id: possibleUser[0].user_id,
      name: possibleUser[0].username,
      imageUrl: possibleUser[0].imgurl,
      email: possibleUser[0].email,
      googleId: res.profileObj.googleId,
    };
    console.log(myObject);
    setProfile(myObject);
    window.localStorage.setItem("user", JSON.stringify(myObject));
    setLoggedIn(true);
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  if (loggedIn) {
    return (
      <Box sx={{ flexGrow: 1 }} justifyContent="space-between">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              href="/"
            >
              <HomeIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={navigateToHomePage}>Home</MenuItem>
              <MenuItem onClick={navigateToViewThreads}>
                View All Threads
              </MenuItem>
              <MenuItem onClick={navigateToViewTips}>View Tips</MenuItem>
            </Menu>
            <Typography
              variant="h3"
              component="div"
              sx={{ flexGrow: 1, fontSize: 18 }}
            >
              Hello {profile.name}!
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Game Tips
            </Typography>
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logOut}
            />
            <Avatar
              alt={profile.name}
              src={profile.imageUrl}
              style={{ border: "1px solid black", margin: 20 }}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
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
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            autoLoad={false}
            onAutoLoadFinished={true}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
