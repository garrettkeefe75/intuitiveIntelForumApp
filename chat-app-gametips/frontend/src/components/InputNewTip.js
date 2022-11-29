import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  TextareaAutosize,
} from "@mui/material";

const InputTip = () => {
  const [tipName, setTipName] = useState("");
  const [gameNames, setGameNames] = useState([]);
  const [mapNames, setMapNames] = useState([]);
  const [characterNames, setCharacterNames] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
 
  const getGameNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/games");
      const jsonData = await response.json();
      setGameNames(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getMapNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/maps");
      const jsonData = await response.json();
      setMapNames(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCharacterNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/characters");
      const jsonData = await response.json();
      setCharacterNames(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
 
  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
    getGameNames();
    getMapNames();
    getCharacterNames();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { tipName };
      await fetch("http://localhost:5000/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Fragment>
        <form>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <Typography
                  variant="h2"
                  paddingTop="100px"
                  paddingBottom="-50px"
                  sx={{ textAlign: "center" }}
                >
                  Create A New Thread
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <img
                  padding="40px"
                  width="300"
                  height="400"
                  src={require("../pngfind.com-mario-bros-png-2835524.png")}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={8}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Grid
                item
                sm={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  id="InputTipName"
                  label="Input Tip Name"
                  color="primary"
                  variant="outlined"
                  value={tipName}
                  onChange={(e) => {
                    setTipName(e.target.value);
                  }}
                  sx={{ width: 600, marginTop: "15px" }}
                  style={{ backgroundColor: "white" }}
                />
                <Grid item sm={2} style={{ marginTop: "10px" }}>
                  <Button variant="contained" onClick={onSubmitForm}>
                    Add Tip Thread
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Fragment>
    </>
  );
};

export default InputTip;
