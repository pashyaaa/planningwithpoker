import { Box, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';

const Player = ({ id, name }) => {
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
          background:
            gameContext.game.currentRound.votes[id] &&
            gameContext.game.currentRound.votesRevealed === false
              ? '#3993ff'
              : '#e8e9ea',
          borderRadius: '0.8rem',
          height: '5rem',
          width: '3rem',
          flexShrink: '0',
          textAlign: 'center'
        }}
      >
        {gameContext.game.currentRound.votesRevealed ? (
          <Typography
            sx={{
              color: '#3993ff',
              fontWeight: 700,
              marginY: 'auto',
              fontSize: '1.8rem',
              marginTop: '1rem'
            }}
          >
            {gameContext.game.currentRound.votes[id]}
          </Typography>
        ) : null}
      </Box>
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
};

export default Player;
