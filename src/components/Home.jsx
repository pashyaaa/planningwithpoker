import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const HomePage = () => {

  const container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const handleCreateGame = () => {
    // Add logic for creating a game
    console.log('Creating a game...');
  };

  const handleJoinGame = () => {
    // Add logic for joining a game
    console.log('Joining a game...');
  };

  return (
    <Container className={container}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Game Platform
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateGame}
      >
        Create Game
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleJoinGame}
      >
        Join Game
      </Button>
    </Container>
  );
};

export default HomePage;
