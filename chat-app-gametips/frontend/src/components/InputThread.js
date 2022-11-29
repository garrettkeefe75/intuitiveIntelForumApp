import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  TextareaAutosize,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const InputThread = () => {
  const [description, setDescription] = useState("");
  const [gameName, setGameName] = useState("");
  const [gameNames, setGameNames] = useState([]); // This is the array containg all gamenames, gameids
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

  const handleChange = (event) => {
    setGameName(event.target.value);
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
    getGameNames();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { gameName, description };
      await fetch("http://localhost:5000/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(() => {
        setGameName("");
        setDescription("");
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
                <InputLabel id="demo-simple-select-label">
                  Choose Game Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gameName}
                  label="Age"
                  onChange={handleChange}
                  sx={{ width: 600, marginTop: "15px" }}
                  style={{ backgroundColor: "white" }}
                >
                  {gameNames.map((eachGame) => (
                    <MenuItem value={eachGame.name}>{eachGame.name}</MenuItem>
                  ))}
                </Select>
                <TextareaAutosize
                  id="inputGameDescription"
                  aria-label="Description"
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  minRows={4}
                  style={{ width: 600, marginTop: "15px", padding: "14px" }}
                />
                <Grid item sm={2} style={{ marginTop: "10px" }}>
                  <Button variant="contained" onClick={onSubmitForm}>
                    Add Thread
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

export default InputThread;
