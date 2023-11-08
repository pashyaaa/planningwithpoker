import { Injectable } from '@angular/core';
import { collectionData, Firestore, doc, setDoc, deleteDoc, getDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore
  ) {}

  // Games
  getGame(id: any) {
    return doc(this.firestore, 'games', id);
  }

  editGame(gameId: any, roundId: any) {
    return updateDoc(doc(this.firestore, 'games/' + gameId), {
      currentRound: roundId
    });
  }

  // Players
  getPlayer(gameId: any, id: any) {
    return getDoc(doc(this.firestore, 'games/' + gameId + '/players/' + id));
  }

  getPlayers(gameId: any) {
    return collection(this.firestore, 'games/' + gameId + '/players');
  }

  editPlayer(gameId: any, playerId: any, name: string) {
    return updateDoc(doc(this.firestore, 'games/' + gameId + '/players/' + playerId), { name });
  }

  // Rounds
  getRound(gameId: any, id: any) {
    return doc(this.firestore, 'games/' + gameId + '/rounds/' + id);
  }

  addRound(gameId: any) {
    return addDoc(collection(this.firestore, 'games/' + gameId + '/rounds'), {
      isReveled: false,
      description: ''
    });
  }

  editRound(gameId: any, roundId: any, isReveled: boolean) {
    return setDoc(doc(this.firestore, 'games/' + gameId + '/rounds/' + roundId), { isReveled });
  }

  // Votes
  getVotes(gameId: any, roundId: any) {
    return collection(this.firestore, 'games/' + gameId + '/rounds/' + roundId + '/votes/');
  }

  async addVote(gameId: any, roundId: any, playerId: any, vote: number) {
    await setDoc(doc(this.firestore, 'games/' + gameId + '/rounds/' + roundId + '/votes/' + playerId), { vote });
  }

  async addDescription(gameId: any, roundId: any, description: any) {
    return setDoc(doc(this.firestore, 'games/' + gameId + '/rounds/' + roundId), { description });
  }
}
