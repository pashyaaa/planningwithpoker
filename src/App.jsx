import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import Header from './components/Header';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import CreateGame from './components/CreateGame';
import Game from './pages/Game';

const App = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Container>
      <Header></Header>
      {/* <div style={{ marginTop: isXSmall ? 56 : 64 }}> */}
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
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="create-game" element={<CreateGame />}></Route>
            <Route path="game" element={<Game />}></Route>
          </Routes>
        </Box>
      {/* </div> */}
    </Container>
  );
};

export default App;
