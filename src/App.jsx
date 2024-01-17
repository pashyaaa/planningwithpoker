import { Button, Container } from '@mui/material';
import Header from './components/Header';
import { useUser } from './context/User';
import * as firebaseService from './firebase/frebaseService';

const App = () => {

  const userContext = useUser();

  const createUser = () => {
      firebaseService.createUser({name: 'raker', age: 22});
  }
  
  const getUser = async () => {
    const user = await firebaseService.getUser('uPooADTGAFqkoeVkWm94')

    console.log(user);
  }

  return (
    <Container>
      <Header></Header>
      <Button style={{margin: '8rem'}} onClick={createUser}>Create User</Button>       
      <Button style={{margin: '8rem'}} onClick={getUser}>Get User</Button>       
    </Container>
  );
};

export default App;
