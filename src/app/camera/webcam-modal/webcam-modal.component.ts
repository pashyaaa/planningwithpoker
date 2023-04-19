import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-webcam-modal',
  templateUrl: './webcam-modal.component.html',
  styleUrls: ['./webcam-modal.component.scss']
})
export class WebcamModalComponent implements OnInit {
  @Input()
  modalController:ModalController

  private trigger: Subject<void> = new Subject<void>();
  public isApp: boolean;
  
  constructor(private platform:Platform) {
    if ((this.platform.is('android') || this.platform.is('ios')) && !this.platform.is('mobileweb')) {
      this.isApp = true;
    }else{
      this.isApp = false;
    }
   }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(webcamInitError: WebcamInitError){
      alert('Webcamera not detected : '+ webcamInitError);
      this.modalController.dismiss();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    
    this.modalController.dismiss(webcamImage.imageAsDataUrl);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public close(){
    this.modalController.dismiss(null);
  }

}
