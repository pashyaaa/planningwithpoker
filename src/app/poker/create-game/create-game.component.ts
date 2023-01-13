import { Component, Input, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {

  @Input() popoverController: PopoverController;
  @Input() gameName: any;
  @Input() gameId: any;
  @Input() action: any;

  form: FormGroup;
  saveClicked = false;
  numberSeries = [[1,2,3,4,5],[0,1,2,3,5,8,13]];

  constructor(
    private formBuilder: FormBuilder,
    private firestore: Firestore,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    if(this.action == 1){
      this.form.setValue({name : this.gameName})
    }
  }

  async save(){
    this.saveClicked = true;
    if(this.action == 0) {
      const player = {
        name: this.form.get('name').value
      };
      const playersRef = collection(this.firestore, 'games');
      addDoc(playersRef, player).then(
        (player)=>{
          localStorage.setItem(this.gameId, player.id)
          this.saveClicked = false;
          this.popoverController.dismiss({playerId: player.id});
        }
      )
    }else{
      const playerRef = doc(this.firestore, 'games/'+this.gameId);
      await updateDoc(playerRef, {name:this.form.get('name').value})
    }
  }

}
