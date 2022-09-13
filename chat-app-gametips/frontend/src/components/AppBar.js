import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from 'gapi-script';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

export default function ButtonAppBar() {
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const clientId = '92924635618-jfp2hmchkrqlc6at7iakf4180jb4aeas.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem('user'));
    if(loggedInUser){
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
  }, []);

  const logOut = () => {
    setProfile(null);
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const onSuccess = (res) => {
    const myObject = {
      name : res.profileObj.name,
      imageUrl : res.profileObj.imageUrl,
      email : res.profileObj.email,
      googleId : res.profileObj.googleId
    };
    console.log(myObject);
    setProfile(myObject);
    window.localStorage.setItem('user', JSON.stringify(myObject));
    setLoggedIn(true);
  };

  const onFailure = (err) => {
    console.log('failed', err);
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
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Game Tips
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Welcome {profile.name}!
            </Typography>
            <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
            <Avatar 
            alt={profile.name} 
            src={profile.imageUrl} 
            style={{ border: "1px solid black", margin: 20 }} 
            imgProps={{referrerPolicy : "no-referrer"}}/>
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
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            autoLoad={false}
            onAutoLoadFinished={true}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
