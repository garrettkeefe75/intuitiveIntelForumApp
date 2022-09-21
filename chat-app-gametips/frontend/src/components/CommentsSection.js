import React, { useEffect, useState, Fragment } from "react";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import ButtonAppBar from "./AppBar";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comments() { //Create functions to talk to database
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const getComments = async () => {
    try {
      console.log(id);
      const response = await fetch("http://localhost:5000/threads/".concat(String(id)));
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setComments(getComments());
  }, []);

  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        <div style={{ padding: 14 }} className="App">
          <h1>Thread Discusion</h1>
          <Paper style={{ padding: "40px 20px" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Halo is one of the best gamne, levels here are annoying{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Halo is one of the best gamne, levels here are annoying{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>

          <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Halo is one of the best gamne, levels here are annoying{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
          <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
                  Halo is one of the best gamne, levels here are annoying{" "}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted 1 minute ago
                </p>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </ Stack>
    </ Fragment>
  );
};

