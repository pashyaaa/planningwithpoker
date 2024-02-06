import { Typography, Box } from '@mui/material';

import { useUser } from '../context/UserContext';
import CreateUser from './CreateUser';
import PokerTable from './PokerTable';

const HomePage = () => {
  const userContext = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '6rem',
        flexDirection: 'column',
        boxSizing: 'border-box',
        outlineColor: '#74b3ff',
      }}
    >
      {/* <Typography variant="h4" gutterBottom>
        Welcome to Plannig Poker
      </Typography> */}
      {userContext.user === null ? <CreateUser></CreateUser> : null}
      <PokerTable></PokerTable>
    </Box>
  );
};

export default HomePage;
