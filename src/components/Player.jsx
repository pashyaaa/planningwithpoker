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
      {gameContext.game.currentRound.votes[id] &&
      gameContext.game.currentRound.votesRevealed === false ? (
        <Box
          sx={{
            transform: 'rotateY(180deg)',
            background:
              'linear-gradient(45deg,#3993ff 12%,transparent 0,transparent 88%,#3993ff 0),linear-gradient(135deg,transparent 37%,#1a7bf2 0,#1a7bf2 63%,transparent 0),linear-gradient(45deg,transparent 37%,#3993ff 0,#3993ff 63%,transparent 0),#74b3ff',
            borderRadius: '0.8rem',
            height: '5rem',
            width: '3rem',
            flexShrink: '0',
            textAlign: 'center',
            transition: 'all 0.3s',
          }}
        ></Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              gameContext.game.currentRound.votes[id] &&
              gameContext.game.currentRound.votesRevealed === false
                ? 'linear-gradient(45deg,#3993ff 12%,transparent 0,transparent 88%,#3993ff 0),linear-gradient(135deg,transparent 37%,#1a7bf2 0,#1a7bf2 63%,transparent 0),linear-gradient(45deg,transparent 37%,#3993ff 0,#3993ff 63%,transparent 0),#74b3ff'
                : '#e8e9ea',
            borderRadius: '0.8rem',
            height: '5rem',
            width: '3rem',
            flexShrink: '0',
            textAlign: 'center',
            border:
              gameContext.game.currentRound.votes[id] &&
              gameContext.game.currentRound.votesRevealed === true
                ? '2px solid #3993ff'
                : null,
            transition: 'all 0.3s',
          }}
        >
          {gameContext.game.currentRound.votesRevealed ? (
            <Typography
              sx={{
                color: '#3993ff',
                fontWeight: 600,
                fontSize: '1.6rem',
              }}
            >
              {gameContext.game.currentRound.votes[id]}
            </Typography>
          ) : null}
        </Box>
      )}
      <Typography variant="h6">{name}</Typography>
    </Box>
  );
};

export default Player;
