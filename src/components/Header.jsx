import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Planning With Poker
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
