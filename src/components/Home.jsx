import { Typography, Box, Button } from '@mui/material';

import { useUser } from '../context/UserContext';
import CreateUser from './CreateUser';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  const goToCreateGame = () => {
    navigate('/create-game')
  }

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
      <Typography variant="h4" gutterBottom>
        Welcome to Plannig Poker
      </Typography>
      {userContext.user === null ? <CreateUser></CreateUser> : (
        <Button size='large' variant='contained' onClick={goToCreateGame}>Create Game</Button>
      )}
    </Box>
  );
};

export default HomePage;
