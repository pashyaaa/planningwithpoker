import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

initializeApp(firebaseConfig);

const db = getFirestore();
const userCollection = collection(db, 'users');

export const getUser = async (userId) => {
  if (userId === null) {
    throw new Error('Invalid userId');
  }

  try {
    const userRef = doc(db, 'users', userId);
    const user = await getDoc(userRef);
    if (user.exists()) {
      return { id: user.id, ...user.data() };
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error('Error getting user from firestore');
  }
};

export const createUser = async (user) => {
  try {
    const userRef = await addDoc(userCollection, {
      name: user.name,
    });
    return {...user, id: userRef.id}
  } catch (e) {
    console.error(e);
    throw new Error('Error creating user');
  }
};
