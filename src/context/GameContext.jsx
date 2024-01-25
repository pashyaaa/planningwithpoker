import { createContext, useState, useContext, useEffect } from 'react';

import * as firebaseService from '../firebase/frebaseService';
import { useUser } from './UserContext';

export const GameContext = createContext(null);

export const useGame = () => {
  const currentGame = useContext(GameContext);
  return currentGame;
};

export const GameProvider = (props) => {
  const [game, setGame] = useState(null);
  const userContext = useUser();

  useEffect(() => {
    const initializeExistingGame = async (gameId) => {
      if (gameId) {
        const game = await firebaseService.getGame(gameId);
        setGame(game);
        localStorage.setItem('gameId', game.id);
      }
    };

    const gameId = localStorage.getItem('gameId');
    initializeExistingGame(gameId);
  }, []);

  const createGame = async (name, cards) => {
    const game = { name, cards, createdBy: userContext.user.id };
    const createdGame = await firebaseService.createGame(game);
    localStorage.setItem('gameId', createdGame.id);
    setGame(createGame);
  };

  return (
    <GameContext.Provider value={{ game, createGame }}>
      {props.children}
    </GameContext.Provider>
  );
};
