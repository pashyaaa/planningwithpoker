import { Box } from '@mui/material';

import PokerTable from './PokerTable';
import PlayerArea from './PlayerArea';
import Player from './Player';

const GameArea = () => {
  return (
    <Box
      sx={{
        gridTemplateAreas: `
            "left top right"
            "left table right"
            "left bottom right"`,
        gridTemplateRows: 'auto 1fr auto',
        gap: '1rem',
        '@media (min-width: 920px)': {
          display: 'inline-grid',
          gridTemplateColumns: '10rem 1fr 10rem',
          margin: '0 auto',
          minWidth: '33rem',
          minHeight: '200px',
          gridGap: '1rem',
        },
        '@media (max-width: 919px)': {
          display: 'grid',
          gridTemplateColumns: '8rem 1fr 8rem',
          width: '44rem',
          minWidth: '15rem',
          minHeight: '38rem',
        },
      }}
    >
      <PokerTable></PokerTable>
      <PlayerArea gridArea='top'></PlayerArea>
      <PlayerArea gridArea='left'></PlayerArea>
      <PlayerArea gridArea='right'></PlayerArea>
      <PlayerArea gridArea='bottom'></PlayerArea>
    </Box>
  );
};

export default GameArea;
