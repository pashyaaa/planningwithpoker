import { createContext, useContext, useState, useEffect } from 'react';

import firebaseConfig from '../firebase/firebaseConfig';
import * as firebaseService from '../firebase/frebaseService';



export const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      const user = firebaseService.getUser(userId);
      setUser(user);
      localStorage.setItem('userId', user.id);
    }
  }, [])

  const registerUser = (user) => {
    const userId = firebaseService.createUser(user);
    localStorage.setItem('userId', userId);
    setUser({...user, id: userId});
  }

  return (
    <UserContext.Provider value={{ user, registerUser }}>
      {props.children}
    </UserContext.Provider>
  );
};