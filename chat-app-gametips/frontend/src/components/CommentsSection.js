import React, { useEffect, useState, Fragment } from "react";
import { List, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import ButtonAppBar from "./AppBar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";

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

  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Thread Discusion
        </Typography>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Game Name
        </Typography>
        <div style={{ padding: 100 }} className="App">
          <Paper
            style={{
              padding: "40px 20px",
              backgroundColor: "white",
              color: "black",
            }}
          >
            <List style={{ maxHeight: "100%", overflow: "auto" }}>
              {comments.map((comment) => (
                <>
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
                        posted 1 minute ago
                      </p>
                      <Grid container>
                        <Grid item>
                          <p style={{ textAlign: "left" }}>
                            <IconButton size="large">
                              <ThumbUpIcon color="primary" />
                            </IconButton>
                          </p>
                        </Grid>
                        <Grid item>
                          <p style={{ textAlign: "left" }}>
                            <IconButton size="large">
                              <ThumbDownIcon color="warning" />
                            </IconButton>
                          </p>
                        </Grid>
                      </Grid>
                      <p style={{ textAlign: "left", color: "green" }}>
                        0 people liked this
                      </p>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="fullWidth"
                    style={{ margin: "30px 10px", backgroundColor: "black" }}
                  />
                </>
              ))}
            </List>
          </Paper>
        </div>
      </Stack>
    </Fragment>
  );
}
