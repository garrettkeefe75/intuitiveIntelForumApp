import React, { useEffect, useState, Fragment } from "react";
import { List, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import ButtonAppBar from "./AppBar";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comments() {
  //Create functions to talk to database
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/threads/".concat(String(id))
        );
        const jsonData = await response.json();
        setComments(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getComments();
  }, [id]);

  const convertTime = (unix_time) => {
    // do not delete the division below, it is actually necessary.
    var time = unix_time/1
    var date = new Date(time);
    return date.toLocaleDateString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true});
  };

  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        <h1 style={{ textAlign: "center" }}>Thread Discusion</h1>
        <div style={{ padding: 75 }} className="App">
          <Paper
            style={{
              padding: "40px 20px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <List style={{ maxHeight: "100%", overflow: "auto" }}>
              {comments.map((comment) => (
                <Grid
                  key={comment.content_id}
                  container
                  wrap="nowrap"
                  spacing={2}
                >
                  <Grid item>
                    <Avatar alt={comment.username} src={comment.imgurl} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>
                      {comment.username}
                    </h4>
                    <p style={{ textAlign: "left" }}>{comment.contents}</p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      {convertTime(comment.unix_time)}
                    </p>
                  </Grid>
                </Grid>
              ))}
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="Remy Sharp" src={imgLink} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    Michel Michel
                  </h4>
                  <p style={{ textAlign: "left" }}>
                    Halo is one of the best gamne, levels here are annoying{" "}
                  </p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted 1 minute ago
                  </p>
                </Grid>
              </Grid>
            </List>
          </Paper>
        </div>
      </Stack>
    </Fragment>
  );
}
