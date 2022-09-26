import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  TextareaAutosize,
} from "@mui/material";

const InputThread = () => {
  const [description, setDescription] = useState("");
  const [gameName, setGameName] = useState("");
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
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
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              Create A New Thread
            </Typography>
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
                  id="inputGameName"
                  label="Input Game Name"
                  color="secondary"
                  variant="outlined"
                  value={gameName}
                  onChange={(e) => {
                    setGameName(e.target.value);
                  }}
                  sx={{ width: 300, marginTop: "15px" }}
                />
                <TextareaAutosize
                  id="inputGameDescription"
                  aria-label="Description"
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  minRows={4}
                  style={{ width: 300, marginTop: "15px", padding: "14px" }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={onSubmitForm}>
                  Add Thread
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Fragment>
    </>
  );
};

export default InputThread;
