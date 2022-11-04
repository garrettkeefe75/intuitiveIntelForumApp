import React, { useEffect, useState, Fragment } from "react";
import { List, Stack, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  Divider,
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  //  Button,
} from "@material-ui/core";
import ButtonAppBar from "./AppBar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//const imgLink =
//"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comments() {
  //Create functions to talk to database
  const [comments, setComments] = useState([]);
  const [commentToPost, setCommentToPost] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
  }, []);

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

  function clearCookie(commentID) {
    document.cookie = commentID + "=;expires=" + new Date(0).toUTCString();
  }
  function setLike(commentID) {
    document.cookie = commentID + "=y";
  }

  function setDislike(commentID) {
    document.cookie = commentID + "=n";
  }

  function hasLiked(commentID) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie.length >= 2 && cookie[0] === commentID && cookie[1] === "y")
        return true;
    }
    return false;
  }

  function hasDisliked(commentID) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie.length >= 2 && cookie[0] === commentID && cookie[1] === "n")
        return true;
    }
    return false;
  }

  const sendLikeRatioChange = async (comment, amountToChange) => {
    try {
      const body = { amountToChange };
      var URI =
        "http://localhost:5000/threads/".concat(String(id)) +
        "/".concat(String(comment.content_id)) +
        "/changeLikeRatio";
      await fetch(URI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setComments((comments) =>
        comments.map((com) =>
          com.content_id === comment.content_id
            ? {
                ...com,
                like_dislike_ratio: com.like_dislike_ratio + amountToChange,
              }
            : com
        )
      );
      comment.like_dislike_ratio += amountToChange;
    } catch (error) {
      console.error(error.message);
      alert("Something went wrong!");
      clearCookie(comment.content_id);
    }
  };

  const thumbsUp = async (comment) => {
    var amountToChange = 0;
    if (!hasLiked(comment.content_id)) {
      if (hasDisliked(comment.content_id)) amountToChange += 2;
      else amountToChange += 1;
      setLike(comment.content_id);
    } else {
      amountToChange -= 1;
      clearCookie(comment.content_id);
    }
    sendLikeRatioChange(comment, amountToChange);
  };

  const thumbsDown = async (comment) => {
    var amountToChange = 0;
    if (!hasDisliked(comment.content_id)) {
      if (hasLiked(comment.content_id)) amountToChange -= 2;
      else amountToChange -= 1;
      setDislike(comment.content_id);
    } else {
      amountToChange += 1;
      clearCookie(comment.content_id);
    }
    sendLikeRatioChange(comment, amountToChange);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const user_id = profile.user_id;
      const contents = commentToPost;
      const body = { user_id, contents };
      const response = await fetch(
        "http://localhost:5000/threads/".concat(String(id)),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const jsonData = await response.json();
      const newComment = {
        content_id: jsonData.content_id,
        user_id: jsonData.user_id,
        username: profile.name,
        contents: commentToPost,
        imgurl: profile.imageUrl,
        unix_time: jsonData.unix_time,
        like_dislike_ratio: jsonData.like_dislike_ratio,
      };
      setCommentToPost("");
      setComments((comments) => [...comments, newComment]);
    } catch (error) {
      console.log(error);
    }
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
          <div
            style={{
              paddingLeft: 300,
              paddingRight: 300,
              paddingBottom: 50,
              border: 2,
              borderRadius: 15,
            }}
            className="App"
          >
            <Paper>
              <List
                // style={{ maxHeight: "100%", overflow: "auto" }}
                sx={{
                  width: "100%",
                  maxWidth: 900,
                  bgcolor: "beige",
                  position: "relative",
                  padding: "40px",
                  overflow: "auto",
                  maxHeight: 600,
                }}
              >
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
                        <p style={{ textAlign: "left", color: "black" }}>
                          {convertTime(comment.unix_time)}
                        </p>
                        <Grid container>
                          <Grid item>
                            <p style={{ textAlign: "left" }}>
                              <IconButton
                                size="large"
                                onClick={() => thumbsUp(comment)}
                              >
                                <ThumbUpIcon
                                  color={
                                    hasLiked(comment.content_id)
                                      ? "primary"
                                      : "disabled"
                                  }
                                />
                              </IconButton>
                            </p>
                          </Grid>
                          <p style={{ textAlign: "left", color: "green" }}>
                            {comment.like_dislike_ratio}
                          </p>
                          <Grid item>
                            <p style={{ textAlign: "left" }}>
                              <IconButton
                                size="large"
                                onClick={() => thumbsDown(comment)}
                              >
                                <ThumbDownIcon
                                  color={
                                    hasDisliked(comment.content_id)
                                      ? "warning"
                                      : "disabled"
                                  }
                                />
                              </IconButton>
                            </p>
                          </Grid>
                        </Grid>
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
            {loggedIn && (
              <div>
                <TextField
                  id="filled-basic"
                  label="Post Comment"
                  variant="filled"
                  margin="normal"
                  fullWidth
                  style={{ backgroundColor: "white" }}
                  value={commentToPost}
                  onChange={(e) => {
                    setCommentToPost(e.target.value);
                  }}
                />
                <Button variant="contained" onClick={onSubmitForm}>
                  Post Comment
                </Button>
              </div>
            )}
          </div>
        </Stack>
      </Fragment>
    );
  }
}
