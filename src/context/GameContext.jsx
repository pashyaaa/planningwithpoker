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

  const initializeGame = async (gameId) => {
    if (gameId) {
      const game = await firebaseService.getGame(gameId);
      setGame(game);
      localStorage.setItem('gameId', game.id);
    }
  };

  useEffect(() => {
    const gameId = localStorage.getItem('gameId');
    initializeGame(gameId);
  }, []);

  const createGame = async (name, cards) => {
    const game = {
      name,
      cards,
      createdBy: userContext.user.id,
      players: [userContext.user.id],
    };
    const createdGame = await firebaseService.createGame(game);
    localStorage.setItem('gameId', createdGame.id);
    setGame(createdGame);
    return createdGame;
  };

  return (
    <GameContext.Provider value={{ game, createGame, initializeGame }}>
      {props.children}
    </GameContext.Provider>
  );
};
