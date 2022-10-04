import React, { useEffect, useState, Fragment } from "react";
import { List, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
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
import CircularProgress from "@mui/material/CircularProgress";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comments() {
  //Create functions to talk to database
  const [comments, setComments] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/threads/".concat(String(id))
        ).then(setSpinner(true));
        const jsonData = await response.json();
        setComments(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    getComments().then(setSpinner(false));
  }, [id]);

  const convertTime = (unix_time) => {
    // do not delete the division below, it is actually necessary.
    var time = unix_time / 1;
    var date = new Date(time);
    return date.toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (spinner) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else {
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
                backgroundColor: "#330000",
                color: "white",
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
                        <p style={{ textAlign: "left", color: "white" }}>
                          {convertTime(comment.unix_time)}
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
}
