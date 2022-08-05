import { Injectable } from '@angular/core';
import { collectionData, Firestore, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
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

  async deleteTask(task:any){
    await deleteDoc(doc(this.firestore, "tasks", task.title));
  }
}
