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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const ITEM_HEIGHT = 48;

export default function TipsComponent() {
  const [profile, setProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tips, setTips] = useState([]);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ["Delete"];

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

  const deleteTip = async (tipid) => {
    try{
      const response = await fetch("http://localhost:5000/tips/tip/".concat(String(tipid)), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await response.json();
      console.log(jsonData);
      if(jsonData === "Tip deleted."){
        setTips(tips.filter(tip => tip.tipid !== tipid));
      }
      else{
        console.error("Tip failed to delete.")
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  function handleOption(optionString, tipid){
    if(optionString === "Delete"){
      console.log("Delete tip " + String(tipid))
      deleteTip(tipid)
    }
    else{
      console.log("Do Nothing.")
    }
  };

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
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                  />
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} onClick={() => handleOption(option, tip.tipid)}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
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
