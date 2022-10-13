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
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
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
        console.log(user_id);
        console.log(String(user_id));
        const response = await fetch("http://localhost:5000/tips/".concat(String(user_id)));
        const jsonData = await response.json();
        setTips(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    };
    console.log(profile);
    if(profile !== [])
      getTips(profile.user_id);
  }, [profile]);



  if (!loggedIn) {
    return (
      <Fragment>
        <Stack spacing={3}>
          <ButtonAppBar />
          <Typography variant="h2" component="div" align="center" color="primary">
            No tips to display, try logging in.
          </Typography>
        </Stack>
      </Fragment>

    )
  }
  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        <Box className={classes.root}>
          {tips.map((tip) => (
            <Card key={tip.tipid}>
              <CardHeader
                avatar={<Avatar>N</Avatar>}
                title={tip.title}
                subheader="Card sub heading"
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography variant="h3">{tip.explanation}</Typography>
              </CardContent>
              <CardActions>
                <Button>share</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Stack>
    </Fragment>
  );
}
