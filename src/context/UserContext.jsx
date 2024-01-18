import { createContext, useContext, useState, useEffect } from 'react';

import * as firebaseService from '../firebase/frebaseService';

export const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeExistingUser = async (userId) => {
      if (userId) {
        const user = await firebaseService.getUser(userId);
        setUser(user);
        localStorage.setItem('userId', user.id);
      }
    }

    const userId = localStorage.getItem('userId');
    initializeExistingUser(userId);
    
  }, [])

  const registerUser = async (user) => {
    const createdUser = await firebaseService.createUser(user);
    localStorage.setItem('userId', createdUser.id);
    setUser(createdUser);
  }

  return (
    <UserContext.Provider value={{ user, registerUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
