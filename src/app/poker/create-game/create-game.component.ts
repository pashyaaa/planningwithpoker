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
  numberSeries = [[0,1,2,3,5,8,13],[1,2,3,4,5]];

  constructor(
    private formBuilder: FormBuilder,
    private firestore: Firestore,
  ) { }

  ngOnInit() {
    if(this.action == 1){
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
      });
      this.form.setValue({name : this.gameName})
    }else
    {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
        numberSeries: ['', [Validators.required]],
      });
    }
  }

   save(){
    this.saveClicked = true;
    console.log(this.form.get('name').value)
    if(this.action == 0) {
      const game = {
        name: this.form.get('name').value,
        numberSeries: this.numberSeries[this.form.get('numberSeries').value]
      };
      const gamesRef = collection(this.firestore, 'games');
      
      addDoc(gamesRef, game).then(
        (game)=>{
          this.saveClicked = false;
          this.popoverController.dismiss({gameId: game.id, selectedNumberSeries: this.numberSeries[this.form.get('numberSeries').value]});
        }
      )
    }else{
      const gamesRef = doc(this.firestore, 'games/'+this.gameId);
      updateDoc(gamesRef, {name:this.form.get('name').value}).then(
        (player)=>{
          this.saveClicked = false;
          this.popoverController.dismiss({gameId: this.gameId});
        }
      )
    }
  }

}
