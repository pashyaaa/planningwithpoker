import { useEffect } from 'react';

import { Container } from '@mui/material';

import Header from './components/Header';
import { useUser } from './context/UserContext';
import UserInput from './components/UserInput';


const App = () => {

  const userContext = useUser();

  useEffect(() => {
    if (userContext.user === null) {

    }
  })


  return (
    <Container>
      <Header></Header>
      { userContext.user === null ? <UserInput></UserInput> : null }
    </Container>
  );
};

export default App;
