import React, { Fragment, useState, useEffect } from "react";
import { Button, Container, TextField, Grid } from "@mui/material";

const InputThread = () => {
  const [description, setDescription] = useState("");
  const [gameName, setGameName] = useState("");
  const [ profile, setProfile ] = useState([]);
  const [ loggedIn, setLoggedIn] = useState(false);
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
          <Container maxWidth="sm">
            <h1>Create A New Thread</h1>
            <Grid container spacing={8}>
              <Grid item sm={8}>
                <TextField
                  id="outlined-basic"
                  label="Input Game Name"
                  variant="outlined"
                  value={gameName}
                  onChange={(e) => {
                    setGameName(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
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
