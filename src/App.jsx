import { Button, Container } from '@mui/material';
import Header from './components/Header';

import { useGame } from './context/Game';
import { useUser } from './context/User';

const App = () => {
  const userContext = useUser();
  const gameContext = useGame();

  const clickHandler = () => {
    userContext.setUser('ganesh');
    gameContext.setGame('game name');
  };

  return (
    <Container>
      <Header></Header>
      <h1>Hello</h1>
      <h1> {gameContext.game} </h1>
      <h1> {userContext.user} </h1>
      <Button onClick={(e) => clickHandler()}>Click</Button>
    </Container>
  );
};

export default App;
