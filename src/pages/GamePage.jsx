import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CardArea from '../components/CardArea';
import GameArea from '../components/GameArea';
import CreateUser from '../components/CreateUser';

import { useUser } from '../context/UserContext';
import { useGame } from '../context/GameContext';

const Game = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userContext = useUser();
  const gameContext = useGame();

  const gameId = params.gameId;

  useEffect(() => {
    if (!gameId) {
      navigate('/create-game');
    } else {
      gameContext.initializeGame(gameId);
    }
  });

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

export default Game;
