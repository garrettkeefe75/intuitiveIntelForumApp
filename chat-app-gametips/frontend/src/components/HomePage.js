import React, { Fragment } from "react";
import { Typography, Link, Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import ButtonAppBar from "./AppBar";
import ImageSlider from "./ImageSlider";

export default function HomePage() {
  const slides = [
    {
      url:
        "https://1.bp.blogspot.com/_h0vlncJNDm0/TLrX8IiIJxI/AAAAAAAAAFo/f0hw_LUUhGQ/s1600/0801261252494.jpg",

      title: "beach",
    },
    {
      url:
        "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/12/SubwaySurfers.jpg?q=50&fit=contain&w=1140&h=570&dpr=1.5",
      title: "boat",
    },
    {
      url: "https://cdn.mos.cms.futurecdn.net/Kuuyu5VZoVxqZxy48swupn.jpg",
      title: "forest",
    },
    {
      url:
        "https://external-preview.redd.it/v3_qqshQkCU0KyoBaF8--vGu8NG-W9u7-psCA8LqGQg.jpg?auto=webp&s=d39fcd9fd1e0995f418acdba2669c8141a14f737",
      title: "city",
    },
    {
      url: "https://cdn.mos.cms.futurecdn.net/sQBzxPp8nDpTJ3RFNNzZzT.jpg",
      title: "italy",
    },
  ];
  const containerStyles = {
    width: "1100px",
    height: "500px",
    margin: "20px auto",
  };
  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        <Grid container justifyContent="center">
          <Box
            height="250px"
            width="650px"
            justifyContent="center"
            sx={{
              border: 2,
              borderColor: "black",
              backgroundColor: "orange",
              borderRadius: "16px",
              "&:hover": {
                backgroundColor: "yellow",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Typography
              variant="h2"
              component="div"
              align="center"
              color="blue"
              fontFamily="TimesNewRoman"
            >
              Welcome to Intuitive Intel Forum!
            </Typography>
            <Link href="/chatRooms" align="center">
              <Typography
                variant="h6"
                component="div"
                align="center"
                color="black"
              >
                Click here to see our available chat rooms!
              </Typography>
            </Link>
          </Box>
        </Grid>
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>
      </Stack>
    </Fragment>
  );
}
