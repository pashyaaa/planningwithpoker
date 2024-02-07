import { createContext, useState, useContext } from 'react';

import * as firebaseService from '../firebase/firebaseService';
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
      if (game === null || game.id !== gameId) {
        const game = await firebaseService.getGame(gameId);
        setGame(game);
        localStorage.setItem('gameId', game.id);
      }
    }
  };

  const createGame = async (name, cards) => {
    const game = {
      name,
      cards,
      createdBy: userContext.user.id,
    };
    const createdGame = await firebaseService.createGame(game);
    localStorage.setItem('gameId', createdGame.id);
    setGame(createdGame);
    return createdGame;
  };

  const getPlayers = () => {
    return game.players ? game.players : [];
  };

  const addPlayer = async (playerId, playerName) => {
    firebaseService.addPlayerToGame(game.id, playerId, playerName);
  };

  return (
    <GameContext.Provider
      value={{ game, createGame, initializeGame, addPlayer, getPlayers }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
