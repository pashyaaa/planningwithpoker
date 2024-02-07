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
    const playersPerBlock = Math.ceil(players.length/4);
    setFirstBlock(players.slice(0, playersPerBlock));
    setSecondBlock(players.slice(playersPerBlock, playersPerBlock*2));
    setThirdBlock(players.slice(playersPerBlock*2, playersPerBlock*3));
    setFourthBlock(players.slice(playersPerBlock*3, playersPerBlock*4));
  }, [gameContext, gameContext.game, gameContext.players])


  return (
    <Box
      sx={{
        gridTemplateAreas: `
            "left top right"
            "left table right"
            "left bottom right"`,
        gridTemplateRows: 'auto 1fr auto',
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
          minWidth: '15rem',
          minHeight: '32rem',
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
