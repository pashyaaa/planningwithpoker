import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

import User from './User';

const Header = () => {
  
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Planning With Poker
        </Typography>
        <User></User>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
