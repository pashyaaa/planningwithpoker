import { Box, Typography } from '@mui/material';

const Player = () => {
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
          background: '#e8e9ea',
          borderRadius: '0.8rem',
          height: '5rem',
          width: '3rem',
          flexShrink: '0',
        }}
      ></Box>
      <Typography>Name</Typography>
    </Box>
  );
};

export default Player;
