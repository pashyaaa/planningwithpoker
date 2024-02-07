import { Box } from '@mui/material';

import Player from './Player';

const PlayerArea = ({ gridArea, players }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '2.8rem',
        outlineColor: '#74b3ff',
        position: 'relative',
        flexDirection:
          gridArea === 'top' || gridArea === 'bottom' ? 'row' : 'column',
        justifyContent: 'space-around',
        gridArea: gridArea,
      }}
    >
      {players.map((player) => {
        return (
          <Player key={player.id} id={player.id} name={player.name}></Player>
        );
      })}
    </Box>
  );
};

export default PlayerArea;
