import React, {Fragment} from 'react';
import { Typography, Link } from '@mui/material';
import { Stack } from '@mui/system';
import ButtonAppBar from "./AppBar";

export default function HomePage() {
  return (
    <Fragment>
      <Stack spacing={3}>
        <ButtonAppBar />
        <Typography variant="h2" component="div" align="center" color="blue">
          Welcome to Intuitive Intel Forum! 
        </Typography>
        <Link href='/chatRooms' align='center'>Click here to see our available chat rooms!</Link>
      </Stack>
    </Fragment>
  );
}