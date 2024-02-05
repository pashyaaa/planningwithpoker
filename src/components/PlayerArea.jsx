import { Box } from "@mui/material";

import Player from "./Player";

const PlayerArea = (props) => {
  return (
<Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '2.8rem',
        outlineColor: '#74b3ff',
        position: 'relative',
        flexDirection: props.gridArea == 'top' || props.gridArea == 'bottom' ? 'row' : 'column',
        justifyContent: 'space-around',
        gridArea: props.gridArea,
      }}
        >
            <Player></Player>
            <Player></Player>
    </Box>
  )
};

export default PlayerArea;
