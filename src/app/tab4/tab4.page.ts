import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  @ViewChild(IonModal) modal: IonModal;
  tasks:any = [];
  task:any = {};
  isModalOpen = false;

  constructor(
    private dataService:DataService
  )
  {
    this.dataService.getTasks("Uncategorized").subscribe(res=>{
      this.tasks = [];
      res.forEach(task => {
        if(task.type == 'Uncategorized' && task.completed_date == undefined )
        {
          this.tasks.push(task);
        }
      });
    })
  }

  add(task:any){
    this.dataService.addTask(task);
  }

  edit(task:any){
    this.task.title = task.title;
    this.task.type = task.type;
    this.setOpen(true);
    //this.dataService.editTask(task);
  }

  delete(task:any){
    console.log(task)
    this.dataService.deleteTask(task);
  }

  done(task:any){
    this.dataService.editTask(task);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.setOpen(false);
  }

  confirm() {
    this.modal.dismiss(this.task, 'confirm');
    this.setOpen(false);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<any>>;
    if(ev.detail.data){
      this.task.title = ev.detail.data.title;
      this.task.type = ev.detail.data.type;
      this.add(this.task);
      this.task = {};
    }else{
      this.task = {};
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
