import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

initializeApp(firebaseConfig);

const db = getFirestore();

const usersCollection = collection(db, 'users');
const gamesCollection = collection(db, 'games');

export const getUser = async (userId) => {
  if (!userId) {
    throw new Error('Invalid userId');
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error('Error fetching user from firestore');
  }
};

export const createUser = async (user) => {
  if (!user || !user.name) {
    throw new Error('Invalid user');
  }
  try {
    const userRef = await addDoc(usersCollection, {
      name: user.name,
    });
    return { ...user, id: userRef.id };
  } catch (e) {
    console.error(e);
    throw new Error('Error creating user in firestore');
  }
};

/**
 *
 * @param {Object} game
 * @returns created game
 */
export const createGame = async (game) => {
  if (!game || !game.name) {
    throw new Error('Invalid game name');
  }
  if (!game || !game.createdBy) {
    throw new Error('Invalid createdBy field');
  }
  if (!game || !game.cards) {
    throw new Error('Invalid cards');
  }

  try {
    const gameRef = await addDoc(gamesCollection, game);
    return { id: gameRef.id, ...game };
  } catch (e) {
    console.error(e);
    throw new Error('Error creating game in firestore');
  }
};

export const getGame = async (gameId) => {
  if (!gameId) {
    throw new Error('Invalid game id');
  }

  try {
    const gameRef = doc(db, 'games', gameId);
    const gameDoc = await getDoc(gameRef);
    if (gameDoc.exists()) {
      return { id: gameDoc.id, ...gameDoc.data() };
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error('Error fetching game from firestore');
  }
};

export const addPlayerToGame = async (gameId, playerId, playerName) => {
  if (!gameId || !playerId || !playerName) {
    throw new Error('Invalid game id');
  }

  try {
    const gameRef = doc(db, 'games', gameId);
    const gameDoc = (await getDoc(gameRef)).data();

    gameDoc.players = gameDoc.players ? gameDoc.players : [] 
    const currentPlayer = gameDoc.players.find((player) => player.id === playerId);
    if (currentPlayer === undefined) {
      const newPlayers = [...gameDoc.players, { id: playerId, name: playerName }];
      await updateDoc(gameRef, { players: newPlayers });
    }

  } catch (e) {
    throw new Error(`Failed to update game with the current players: ${gameId}`);
  }
};
