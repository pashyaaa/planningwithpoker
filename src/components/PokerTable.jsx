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
        {gameContext.game.currentRound.votesRevealed === false ? (
          <Button variant="contained" size="large" onClick={revealVotes}>
            Reveal Votes
          </Button>
        ) : (
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h4">
              {gameContext.game.currentRound.voteAverage}
            </Typography>
            <Button variant="contained" size="large" onClick={resetVotes}>
              Reset Votes
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PokerTable;
