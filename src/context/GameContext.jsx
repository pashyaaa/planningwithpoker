import { createContext, useState, useContext, useEffect } from 'react';

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

  const [players, setPlayers] = useState([]);

  let unsubsribeGameListener;

  useEffect(() => {
    if (game && game.players) {
      setPlayers(game.players);
    }
  }, [game]);

  const initializeGame = async (gameId) => {
    if (gameId) {
      if (game === null || game.id !== gameId) {
        if (unsubsribeGameListener) unsubsribeGameListener();
        const game = await firebaseService.getGame(gameId);
        setGame(game);
        localStorage.setItem('gameId', game.id);

        unsubsribeGameListener = firebaseService.attachGameListener(
          game.id,
          onGameUpdate,
        );
      }
    }
  };

  const onGameUpdate = (updatedGame) => {
    setGame(updatedGame);
  };

  const createGame = async (name, cards) => {
    const game = {
      name,
      cards,
      createdBy: userContext.user.id,
      players: [{ id: userContext.user.id, name: userContext.user.name }],
    };
    const createdGame = await firebaseService.createGame(game);
    localStorage.setItem('gameId', createdGame.id);
    setGame(createdGame);
    return createdGame;
  };

  const addPlayer = async (playerId, playerName) => {
    const playerAdded = await firebaseService.addPlayerToGame(
      game.id,
      playerId,
      playerName,
    );

    if (playerAdded === true) {
      if (game.players === undefined) game.players = [];
      game.players = [...game.players, { id: playerId, name: playerName }];

      setGame(game);
    }
  };

  const setVote = async (voteValue) => {
    if (voteValue === null) {
      delete game.currentRound.votes[userContext.user.id];
    } else {
      game.currentRound.votes[userContext.user.id] = voteValue;
    }
    setGame(game);
    firebaseService.updateGame(game);
  }

  return (
    <GameContext.Provider
      value={{
        game,
        createGame,
        initializeGame,
        addPlayer,
        players,
        setVote
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
