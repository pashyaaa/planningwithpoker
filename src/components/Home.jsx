import React from 'react';
import { Typography, Box } from '@mui/material';

import { useUser } from '../context/UserContext';
import CreateUser from './CreateUser';
import CreateGame from './CreateGame';
import GameArea from './GameArea';

const HomePage = () => {
  const userContext = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '8rem',
        flexDirection: 'column',
        boxSizing: 'border-box',
        outlineColor: '#74b3ff',
      }}
    >
      {/* <Typography variant="h4" gutterBottom>
        Welcome to Plannig Poker
      </Typography> */}
      {userContext.user === null ? <CreateUser></CreateUser> : null}
      {/* <CreateGame></CreateGame> */}
      <GameArea></GameArea>
    </Box>
  );
};

export default HomePage;
