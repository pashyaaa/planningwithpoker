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
        const game = await firebaseService.getGame(gameId);
        setGame(game);
        localStorage.setItem('gameId', game.id);
        startGameListener(game.id);
      }
    }
  };

  const startGameListener = (gameId) => {
    if (unsubsribeGameListener) unsubsribeGameListener();
    unsubsribeGameListener = firebaseService.attachGameListener(
      gameId,
      onGameUpdate,
    );
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
    startGameListener(createdGame.id);
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
  };

  const revealVotes = () => {
    game.currentRound.votesRevealed = true;
    let sum = 0;
    let count = 0;
    Object.values(game.currentRound.votes).forEach((vote) => {
      sum += vote;
      count++;
    });

    const average = sum / count;

    game.currentRound.voteAverage = average;

    setGame(game);
    firebaseService.updateGame(game);
  };

  const resetVotes = () => {
    game.currentRound.votesRevealed = false;
    game.currentRound.votes = {};
    game.currentRound.voteAverage = 0;

    setGame(game);
    firebaseService.updateGame(game);
  };

  const updatePlayerName = async (playerId, playerName) => {
    // No game then no need to change anything
    if (game === null) return;

    const newPlayers = game.players.map((player) => {
      if (player.id === playerId) {
        player.name = playerName;
      }
      return player;
    });

    game.players = newPlayers;
    setGame(game);
    await firebaseService.updateGame(game);
  };

  return (
    <GameContext.Provider
      value={{
        game,
        createGame,
        initializeGame,
        addPlayer,
        players,
        setVote,
        revealVotes,
        resetVotes,
        currentRound: game === null ? null : game.currentRound,
        updatePlayerName,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
