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

  gameForm: FormGroup;
  saveClicked = false;
  numberSeries = [[0, 1, 2, 3, 5, 8, 13], [1, 2, 3, 4, 5]];

  constructor(
    private formBuilder: FormBuilder,
    private firestore: Firestore,
  ) {}

  async ngOnInit() {
    {
      this.gameForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        numberSeries: ['', [Validators.required]],
        customSeries: ['', []], // No required validator initially
      });

      if(this.action == 1){
        this.gameForm.setValue({name: this.gameName, numberSeries: {}, customSeries: {}});
      }

      if(this.action == 0){
        // Add a custom validator to 'customSeries' based on 'numberSeries' value
        this.gameForm.get('numberSeries').valueChanges.subscribe((value) => {
          if (value === 'Custom') {
            this.gameForm.get('customSeries').setValidators([Validators.required]);
          } else {
            this.gameForm.get('customSeries').setValidators([]);
          }
          this.gameForm.get('customSeries').updateValueAndValidity();
        });
      }
      
    }
  }

  // Used to get Custom Number Series
  convertStringToArray(inputString: string): (number | string)[] {
    const inputArray = inputString.split(',');
    const resultArray: (number | string)[] = [];
    for (const item of inputArray) {
      const numberValue = parseFloat(item);
      if (!isNaN(numberValue)) {
        resultArray.push(numberValue);
      } else {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

  saveGame() {
    let tempNumberSeries;

    this.saveClicked = true;

    if (this.gameForm.get('numberSeries').value === 'Custom') {
      tempNumberSeries = this.convertStringToArray(this.gameForm.get('customSeries').value);
      this.numberSeries.push(tempNumberSeries);
    }
    else {
      tempNumberSeries = this.numberSeries[this.gameForm.get('numberSeries').value];
    }
    const updateGame = {
      name: this.gameForm.get('name').value,
      numberSeries: tempNumberSeries
    };

    if (this.action === 0) {
      const gamesRef = collection(this.firestore, 'games');
      addDoc(gamesRef, updateGame).then(
        (game) => {
          this.saveClicked = false;
          this.popoverController.dismiss({
            gameId: game.id,
            selectedNumberSeries: this.numberSeries[this.gameForm.get('numberSeries').value]
          });
        }
      );
    }
    else {
      const gamesRef = doc(this.firestore, 'games/' + this.gameId);
      updateDoc(gamesRef, {name:this.gameForm.get('name').value}).then(
        ()=>{
          this.saveClicked = false;
          this.popoverController.dismiss({ gameId: this.gameId});
        }
      );
    }
  }
}
