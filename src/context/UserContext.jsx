import { createContext, useContext, useState, useEffect } from 'react';

import * as firebaseService from '../firebase/firebaseService';

export const UserContext = createContext(null);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const initializeExistingUser = async (userId) => {
      if (userId) {
        const user = await firebaseService.getUser(userId);
        if (user.profilePicture) {
          const profilePictureUrl = await firebaseService.getImageUrl(user.profilePicture);
          setProfilePictureUrl(profilePictureUrl);
        }
        setUser(user);
        localStorage.setItem('userId', user.id);
      }
    };

    const userId = localStorage.getItem('userId');
    initializeExistingUser(userId);
  }, []);

  const registerUser = async (user) => {
    const createdUser = await firebaseService.createUser(user);
    localStorage.setItem('userId', createdUser.id);
    setUser(createdUser);
  };

  const setNewUserName = async (name) => {
    user.name = name;
    const updatedUser = await firebaseService.updateUser(user.id, user);
    setUser(updatedUser);
  };

  const setProfilePicture = async (imageFile) => {
    const uploadedImage = await firebaseService.uploadImage(user.id, imageFile);

    user.profilePicture = uploadedImage.metadata.name;
    const updatedUser = await firebaseService.updateUser(user.id, user);

    const profilePictureUrl = await firebaseService.getImageUrl(updatedUser.profilePicture);
    setProfilePictureUrl(profilePictureUrl);
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        setNewUserName,
        setProfilePicture,
        profilePictureUrl,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
