import { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
