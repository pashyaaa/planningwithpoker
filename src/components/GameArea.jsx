import { Box } from '@mui/material';

import PokerTable from './PokerTable';
import PlayerArea from './PlayerArea';
import { useGame } from '../context/GameContext';
import { useEffect, useState } from 'react';

const GameArea = () => {
  const gameContext = useGame();
  const [firstBlock, setFirstBlock] = useState([]);
  const [secondBlock, setSecondBlock] = useState([]);
  const [thirdBlock, setThirdBlock] = useState([]);
  const [fourthBlock, setFourthBlock] = useState([]);

  useEffect(() => {
    const players = gameContext.players;
    const playerDistribution = [[], [], [], []];
    let ctr = 0;
    for (const p of players) {
      playerDistribution[ctr].push(p);
      ctr = (ctr + 1) % 4;
    }
    setFirstBlock(playerDistribution[0]);
    setSecondBlock(playerDistribution[1]);
    setThirdBlock(playerDistribution[2]);
    setFourthBlock(playerDistribution[3]);
  }, [gameContext.players]);

  return (
    <Box
      sx={{
        gridTemplateAreas: `
            "left top right"
            "left table right"
            "left bottom right"`,
        gridTemplateRows: '8rem 1fr 8rem',
        gap: '1rem 0',
        '@media (min-width: 920px)': {
          display: 'inline-grid',
          gridTemplateColumns: '10rem 1fr 10rem',
          margin: '0 auto',
          minWidth: '28rem',
          minHeight: '200px',
        },
        '@media (max-width: 919px)': {
          display: 'grid',
          gridTemplateColumns: '8rem 1fr 8rem',
          width: '40rem',
          minWidth: '13rem',
          minHeight: '22rem',
        },
      }}
    >
      <PokerTable></PokerTable>
      <PlayerArea gridArea='bottom' players={firstBlock}></PlayerArea>
      <PlayerArea gridArea='top' players={secondBlock}></PlayerArea>
      <PlayerArea gridArea='left' players={thirdBlock}></PlayerArea>
      <PlayerArea gridArea='right' players={fourthBlock}></PlayerArea>
    </Box>
  );
};

export default GameArea;
