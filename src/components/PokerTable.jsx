import { Box } from '@mui/material';

const PokerTable = () => {
  return (
      <Box
        sx={{
          display:'flex',
          background: '#d7e9ff',
          borderRadius: '2.8rem',
          gridArea: 'table',
          height: 'auto',
          minHeight: '12rem',
          padding: '0 1.6rem',
          position: 'relative',
          '@media (min-width: 920px)': {
            minWidth: '28rem',
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
          }}
        >
          {/* Content of the table (like card placeholders) goes here */}
        </Box>
      </Box>
  );
};

export default PokerTable;
