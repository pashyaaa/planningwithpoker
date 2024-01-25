import { Container, useMediaQuery, useTheme } from '@mui/material';

import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Container>
      <Header></Header>
      <div style={{ marginTop: isXSmall ? 56 : 64 }}>
        <Home></Home>
      </div>
    </Container>
  );
};

export default App;
