import { Component, Input, OnInit, Output } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss'],
})
export class CreatePlayerComponent implements OnInit {

  @Input() popoverController: PopoverController;
  @Input() gameId: any;
  @Input() action: any;
  @Input() playerId: any;
  @Input() playerName: any;

  form: FormGroup;
  saveClicked = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private firestore: Firestore,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    if(this.action == 1){
      this.form.setValue({name : this.playerName})
    }
  }

  save(){
    this.saveClicked = true;
    if(this.action == 0) {
      const player = {
        name: this.form.get('name').value
      };
      const playersRef = collection(this.firestore, 'games/'+this.gameId+'/players');
      addDoc(playersRef, player).then(
        (player)=>{
          localStorage.setItem(this.gameId, player.id)
          this.saveClicked = false;
          this.popoverController.dismiss({playerId: player.id});
        }
      )
    }else{
      const playerRef = doc(this.firestore, 'games/'+this.gameId+'/players/' + this.playerId );
      updateDoc(playerRef, {name:this.form.get('name').value}).then(
        (player)=>{
          this.saveClicked = false;
          this.popoverController.dismiss({playerId: this.playerId});
        }
      )
    }
  }

}
