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

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Planning With Poker
        </Typography>
        <ButtonGroup variant="text" sx={{ marginX: 2 }}>
          <Button color="inherit">Create Game</Button>
          <Button color="inherit">Join Game</Button>
        </ButtonGroup>
        {userContext.user !== null ? <User></User> : null}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
