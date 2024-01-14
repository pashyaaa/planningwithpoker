import { Component, Input, OnInit, Output } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { WebcamImage } from 'ngx-webcam';

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
  @Input() playerProfilePic: any;

  form: FormGroup;
  saveClicked = false;
  profilePic = "https://ionicframework.com/docs/img/demos/avatar.svg"
  public webcamImage: WebcamImage = null;
  player:any = {};

  constructor(
    private formBuilder: FormBuilder,
    private firestore: Firestore,
    private imageCompress: NgxImageCompressService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    if(this.action == 1){
      this.form.setValue({name : this.playerName})
      if(this.playerProfilePic)
      {
        this.profilePic = this.playerProfilePic;
      }else{
        this.profilePic = "https://ionicframework.com/docs/img/demos/avatar.svg"
      }
    }
  }

  save(){
    this.saveClicked = true;
    if(this.action == 0) {
      this.player.name = this.form.get('name').value;

      const playersRef = collection(this.firestore, 'games/'+this.gameId+'/players');
      addDoc(playersRef, this.player).then(
        (player)=>{
          localStorage.setItem(this.gameId, player.id)
          this.saveClicked = false;
          this.popoverController.dismiss({playerId: player.id});
        }
      )
    }else{
      const playerRef = doc(this.firestore, 'games/'+this.gameId+'/players/' + this.playerId );
      updateDoc(playerRef, {name:this.form.get('name').value, profilePic:this.profilePic}).then(
        (player)=>{
          this.saveClicked = false;
          this.popoverController.dismiss({playerId: this.playerId});
        }
      )
    }
  }

  selectPicture() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          // after here 'file' can be accessed and used for further process
          // Abort uploading if file size is greater than 50KB
          if (this.imageCompress.byteCount(result) > 512000) {
            window.alert("Image size is greate than 5MB. Please select smaller image.");
            return
          }
          this.profilePic = result;
          this.updateProfile(this.profilePic)
        }
      );
    });
  }

  removePicture() {
    this.profilePic = "https://ionicframework.com/docs/img/demos/avatar.svg"
  }

  updateProfile(profilePic) {
      this.player.profilePic = profilePic;
  }

}
