import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect, Fragment } from "react";
import { Stack } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ButtonAppBar from "./AppBar";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
      },
    },
    card: {
      border: 2,
      borderColor: "grey.500",
      borderRadius: "16px",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
  })
);

export default function TipsComponent() {
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tips, setTips] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("user"));
    if (loggedInUser) {
      setProfile(loggedInUser);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const getTips = async (user_id) => {
      try {
        const response = await fetch(
          "http://localhost:5000/tips/".concat(String(user_id))
        );
        const jsonData = await response.json();
        setTips(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (loggedIn) getTips(profile.user_id);
  }, [profile, loggedIn]);

  if (!loggedIn) {
    return (
      <Fragment>
        <Stack spacing={3}>
          <ButtonAppBar />
          <Typography
            variant="h2"
            component="div"
            align="center"
            color="primary"
          >
            No tips to display, try logging in.
          </Typography>
        </Stack>
      </Fragment>
    );
  } else if (tips.length === 0) {
    return (
      <Fragment>
        <Stack spacing={3}>
          <ButtonAppBar />
          <Typography
            variant="h2"
            component="div"
            align="center"
            color="primary"
          >
            No tips to display, try making some!
          </Typography>
        </Stack>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Stack spacing={3}>
          <ButtonAppBar />
          <div
            style={{ paddingLeft: 400, paddingRight: 300, paddingBottom: 50 }}
            className="App"
          >
            <Box className={classes.root}>
              {tips.map((tip) => (
                <Card
                  key={tip.tipid}
                  style={{
                    backgroundColor: "#61947d",
                  }}
                  className={classes.card}
                >
                  <CardHeader
                    avatar={<Avatar>N</Avatar>}
                    title={tip.title}
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography variant="h4">{tip.explanation}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button>share</Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </div>
        </Stack>
      </Fragment>
    );
  }
}
