import { Box, Button, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';

const PokerTable = () => {
  const gameContext = useGame();

  const revealVotes = () => {
    gameContext.revealVotes();
  };

  const resetVotes = () => {
    gameContext.resetVotes();
  };

  return (
    <Box
      sx={{
        boxShadow:
          Object.keys(gameContext.currentRound.votes).length > 0
            ? '0 0 1rem 2px #48abe0'
            : null,
        display: 'flex',
        background: '#d7e9ff',
        borderRadius: '2.8rem',
        gridArea: 'table',
        height: 'auto',
        minHeight: '11rem',
        padding: '0 1.6rem',
        position: 'relative',
        '@media (min-width: 920px)': {
          minWidth: '26rem',
        },
        '@media (max-width: 919px)': {
          minWidth: '14rem',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {gameContext.currentRound.votesRevealed === false ? (
          Object.keys(gameContext.currentRound.votes).length > 0 && (
            <Button
              variant="contained"
              size="large"
              onClick={revealVotes}
              sx={{
                borderRadius: '0.5rem',
                backgroundColor: '#3993ff',
              }}
            >
              Reveal Votes
            </Button>
          )
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Avg: {gameContext.currentRound.voteAverage}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={resetVotes}
              sx={{
                borderRadius: '0.5rem',
                backgroundColor: '#3993ff',
              }}
            >
              Reset Votes
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PokerTable;
