import { Container } from '@mui/material';

import Header from './components/Header';
import { useUser } from './context/UserContext';
import UserInput from './components/UserInput';
import Home from './components/Home';

const App = () => {
  const userContext = useUser();

  

  return (
    <Container>
      <Header></Header>
      {userContext.user === null ? <UserInput></UserInput> : null }
      <Home></Home>
    </Container>
  );
};

export default App;
