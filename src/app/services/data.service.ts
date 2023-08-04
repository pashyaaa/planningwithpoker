import { Injectable } from '@angular/core';
import { collectionData, Firestore, doc, setDoc, deleteDoc, getDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore:Firestore
  ) { }

  getTasks(type:string){
    const taskRef = collection(this.firestore, 'tasks');
    return collectionData(taskRef);
  }

  async addTask(task:any){
    await setDoc(doc(this.firestore, "tasks", task.title), {
      title: task.title,
      type: task.type,
      status: "Pending",
      created_date: new Date()
    });
  }

  async editTask(task:any){
    await setDoc(doc(this.firestore, "tasks", task.title), {
      title: task.title,
      type: task.type
    });
  }

  async doneTask(task:any){
    await setDoc(doc(this.firestore, "tasks", task.title), {
      completed_date: new Date()
    });
  }

  async deleteTask(task:any){
    await deleteDoc(doc(this.firestore, "tasks", task.title));
  }

  async getTask(id:any){
    await getDoc(doc(this.firestore, "tasks", "Achari rate thrvne"));
  }

  getGame(id:any){
    return doc(this.firestore, "games", id);
  }

  editGame(gameId:any, roundId:any){
    return updateDoc(doc(this.firestore, 'games/'+ gameId), {
      cur_round : roundId
    });
  }

  getPlayer(gameId:any, id:any){
    return getDoc(doc(this.firestore, 'games/'+ gameId + '/players/' + id));
  }

  editPlayer(gameId:any, playerId:any, name:string){
    return updateDoc(doc(this.firestore, 'games/'+ gameId+ '/players/' + playerId), {
      name : name
    });
  }

  getPlayers(gameId:any){
    return collection(this.firestore, 'games/'+ gameId + '/players');
  }

  getRound(gameId:any, id:any){
    return doc(this.firestore, 'games/'+ gameId + '/rounds/' + id);
  }

  async addVote(gameId:any, roundId:any, playerId:any, vote:number){
    await setDoc(doc(this.firestore, 'games/'+ gameId + '/rounds/' + roundId + '/votes/' + playerId), {
      vote : vote
    });
  }

  async addDescription(gameId:any, roundId:any, description:any){
    return setDoc(doc(this.firestore, 'games/'+ gameId + '/rounds/' + roundId), {
      description : description
    });
  }

  addRound(gameId:any){
    return addDoc(collection(this.firestore, 'games/'+ gameId + '/rounds'),{
      isReveled : false,
      description : ""
    })
  }

  editRound(gameId:any, roundId:any, isReveled:boolean){
    return setDoc(doc(this.firestore, 'games/'+ gameId + '/rounds/' + roundId), {
      isReveled : isReveled
    });
  }

  getVotes(gameId:any, roundId:any){
    return collection(this.firestore, 'games/'+ gameId + '/rounds/' + roundId + '/votes/');
  }
}
