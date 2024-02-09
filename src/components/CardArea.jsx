import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const CardArea = () => {
  const [vote, setVote] = useState(null);

  const gameContext = useGame();
  const userContext = useUser();
  const cardValues = gameContext.game.cards;

  useEffect(() => {
    if (gameContext.game.currentRound.votes[userContext.user.id]) {
      setVote(gameContext.game.currentRound.votes[userContext.user.id]);
    } else {
      setVote(null);
    }
  }, [gameContext]);

  const voteButtonClickHanlder = (clickedVote) => {
    if (vote == clickedVote) {
      setVote(null);
      gameContext.setVote(null);
    } else {
      setVote(clickedVote);
      gameContext.setVote(clickedVote);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '0',
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          <Typography>Choose your card</Typography>
        </Box>
        <Box
          sx={{
            boxSizing: 'border-box',
            outlineColor: '#74b3ff',
            display: 'block',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              padding: '0',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
              textAlign: 'center',
              userSelect: 'none',
              whiteSpace: 'none',
              paddingY: '1rem',
            }}
          >
            {cardValues.map((item) => {
              return (
                <ListItem
                  key={item}
                  sx={{
                    display: 'inline-block',
                    padding: 0,
                    margin: '0 0.3rem',
                    marginTop: vote === item ? '-0.8rem' : '0',
                    transition: 'all 0.1s linear',
                    verticalAlign: 'top',
                    whiteSpace: 'nowrap',
                    ':hover':
                      vote !== item
                        ? {
                            marginTop: '-0.3rem',
                          }
                        : null,
                  }}
                >
                  <Box
                    onClick={() => voteButtonClickHanlder(item)}
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                      justifyContent: 'center',
                      background: vote === item ? '#3993ff' : null,
                      border: '2px solid #3993ff',
                      cursor: 'pointer',
                      outline: '0',
                      transition: 'all 0.09s linear',
                      borderRadius: '0.8rem',
                      height: '5rem',
                      width: '3rem',
                      minWidth: '3rem',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: vote === item ? '#ffffff' : '#3993ff',
                        fontWeight: 600,
                        marginY: 'auto',
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CardArea;
