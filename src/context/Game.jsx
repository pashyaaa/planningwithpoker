import { createContext, useState, useContext } from 'react';

export const GameContext = createContext(null);

export const useGame = () => {
  const currentGame = useContext(GameContext);
  return currentGame;
};

export const GameProvider = (props) => {
  const [game, setGame] = useState(null);

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {props.children}
    </GameContext.Provider>
  );
};
