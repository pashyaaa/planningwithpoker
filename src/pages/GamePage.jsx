import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CardArea from '../components/CardArea';
import GameArea from '../components/GameArea';
import CreateUser from '../components/CreateUser';

import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';

const GamePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userContext = useUser();
  const gameContext = useGame();

  const gameId = params.gameId;

  useEffect(() => {
    if (!gameId) {
      const storedGame = localStorage.getItem('gameId'); 
      if (storedGame === null) {
        navigate('/create-game');
      } else {
        navigate(`/game/${storedGame}`);
      }
    } else {
      gameContext.initializeGame(gameId);
    }
  });

  useEffect(() => {
    if (gameContext.game !== null) {
      if (userContext.user !== null) {
        gameContext.addPlayer(userContext.user.id, userContext.user.name);
      }
    }
  }, [userContext.user, gameContext.game])

  return (
    <>
      {userContext.user !== null ? (
        <>
          <GameArea></GameArea>
          <CardArea></CardArea>
        </>
      ) : (
        <CreateUser></CreateUser>
      )}
    </>
  );
};

export default GamePage;
