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

const InputTip = () => {
  const [tipName, setTipName] = useState("");
  const [tipDesc, setTipDesc] = useState("");
  const [gameNames, setGameNames] = useState([]);
  const [mapNames, setMapNames] = useState([]);
  const [characterNames, setCharacterNames] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  //selected game name
  const [gameName, setGameName] = useState("");
  const [charName, setCharName] = useState("");
  const [mapName, setMapName] = useState("");
  const [gameId, setGameId] = useState(null);
  const [charId, setCharId] = useState(null);
  const [mapId, setMapId]= useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
    getGameNames();
  }, []);

  const handleChange = (event) => {
    gameNames.forEach(function (currValue, index, arr) {
      if (currValue.name === event.target.value) {
        setGameId(currValue.gameid);
      }
    });
    setCharName("");
    setCharId(null);
    setMapName("");
    setMapId(null);
    setGameName(event.target.value);
  };
  const handleCharChange = (event) => {
    characterNames.forEach(function (currValue, index, arr) {
      if (currValue.name === event.target.value) {
        setCharId(currValue.charid);
      }
    });
    setCharName(event.target.value);
  };
  const handleMapChange = (event) => {
    mapNames.forEach(function (currValue, index, arr) {
      if (currValue.name === event.target.value) {
        setMapId(currValue.mapid);
      }
    });
    setMapName(event.target.value);
  };

  const getGameNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/games");
      const jsonData = await response.json();
      setGameNames(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const getMapNames = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/maps/".concat(gameId)
        );
        const jsonData = await response.json();
        setMapNames(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    const getCharacterNames = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/characters/".concat(gameId)
        );
        const jsonData = await response.json();
        setCharacterNames(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (gameId === null) {
      console.error("Something went wrong when selecting game name.");
      return;
    }
    getMapNames();
    getCharacterNames();
  }, [gameId]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const user = profile.user_id;
      const character = charId === null ? -1 : charId;
      const map = mapId === null ? -1 : mapId;
      const game = gameId === null ? -1 : gameId;
      const body1 = { tipName, tipDesc, user, character, map, game};
      const response1 = await fetch("http://localhost:5000/tips/tip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body1),
      });
      const tip = await response1.json();
      const tipid = tip.tipid;
      const body = { gameName, tipName, tipid };
      await fetch("http://localhost:5000/tipthreads", {
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

  if(!loggedIn){
    return (<></>)
  }
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
                {gameName.length !== 0 || gameName !== "" ? (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      Choose Character Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={charName}
                      label="Age"
                      onChange={handleCharChange}
                      sx={{ width: 600, marginTop: "15px" }}
                      style={{ backgroundColor: "white" }}
                    >
                      {characterNames.map((eachGame) => (
                        <MenuItem value={eachGame.name}>
                          {eachGame.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <InputLabel id="demo-simple-select-label">
                      Choose Map Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mapName}
                      label="Age"
                      onChange={handleMapChange}
                      sx={{ width: 600, marginTop: "15px" }}
                      style={{ backgroundColor: "white" }}
                    >
                      {mapNames.map((eachGame) => (
                        <MenuItem value={eachGame.name}>
                          {eachGame.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  ""
                )}
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
                <TextField
                  id="InputTipDesc"
                  label="Input Tip Description"
                  color="primary"
                  variant="outlined"
                  value={tipDesc}
                  onChange={(e) => {
                    setTipDesc(e.target.value);
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
