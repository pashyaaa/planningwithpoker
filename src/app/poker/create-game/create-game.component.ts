import { Component, Input, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
  numberSeries = [[0, 1, 2, 3, 5, 8, 13], [1, 2, 3, 4, 5]];

  constructor(
    private formBuilder: FormBuilder,
    private firestore: Firestore,
  ) { }

  customSeriesValidator(required: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (required && (control.value === null || control.value === '')) {
        return { required: true };
      }
      return null;
    };
  }

  ngOnInit() {
    {
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
        numberSeries: ['', [Validators.required]],
        customSeries: ['', []], // No required validator initially
      });

      // Add a custom validator to 'customSeries' based on 'numberSeries' value
      this.form.get('numberSeries').valueChanges.subscribe((value) => {
        if (value === 'Custom') {
          this.form.get('customSeries').setValidators([this.customSeriesValidator(true)]);
        } else {
          this.form.get('customSeries').setValidators([]);
        }
        this.form.get('customSeries').updateValueAndValidity();
      });
    }
  }

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

  save() {
    this.saveClicked = true;
    console.log(this.form.get('name').value);

    let tempNumberSeries;
    if (this.form.get('numberSeries').value === 'Custom') {
      tempNumberSeries = this.convertStringToArray(this.form.get('customSeries').value);
      this.numberSeries.push(tempNumberSeries);
    }
    else {
      tempNumberSeries = this.numberSeries[this.form.get('numberSeries').value];
    }
    const game = {
      name: this.form.get('name').value,
      numberSeries: tempNumberSeries
    };

    if (this.action === 'createGame') {
      const gamesRef = collection(this.firestore, 'games');

      addDoc(gamesRef, game).then(
        (game) => {
          this.saveClicked = false;
          this.popoverController.dismiss({ gameId: game.id, selectedNumberSeries: this.numberSeries[this.form.get('numberSeries').value] });
        }
      )
    } else {
      const gamesRef = doc(this.firestore, 'games/' + this.gameId);
      updateDoc(gamesRef, game).then(
        (player) => {
          this.saveClicked = false;
          this.popoverController.dismiss({ gameId: this.gameId });
        }
      )
    }
  }

}


