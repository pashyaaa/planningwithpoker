import React from 'react';
import { Typography, Box } from '@mui/material';

import { useUser } from '../context/UserContext';
import CreateUser from './CreateUser';
import CreateGame from './CreateGame';

const HomePage = () => {
  const userContext = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '8rem',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Plannig Poker
      </Typography>
      {userContext.user === null ? <CreateUser></CreateUser> : null}
      <CreateGame></CreateGame>
    </Box>
  );
};

export default HomePage;
