import { Box, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';

const Player = ({id, name}) => {
  const gameContext = useGame();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          background: gameContext.game.currentRound.votes[id] ? '#3993ff' : '#e8e9ea',
          borderRadius: '0.8rem',
          height: '5rem',
          width: '3rem',
          flexShrink: '0',
        }}
      ></Box>
      <Typography variant='h6'>{name}</Typography>
    </Box>
  );
};

export default Player;
