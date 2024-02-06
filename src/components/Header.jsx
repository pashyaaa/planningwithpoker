import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material';

import User from './User';
import { useUser } from '../context/UserContext';

const Header = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  const createGameClick = () => {
    navigate('/create-game');
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Planning With Poker
        </Typography>
        {userContext.user !== null ? (
          <>
            <ButtonGroup variant="text" sx={{ marginX: 2 }}>
              <Button color="inherit" onClick={createGameClick}>
                Create Game
              </Button>
            </ButtonGroup>
            <User></User>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
