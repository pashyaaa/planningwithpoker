import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { WebcamModalComponent } from './webcam-modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WebcamModule } from 'ngx-webcam';
 

@NgModule({
  declarations: [WebcamModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebcamModule,
    TranslateModule
  ],
  exports: [
    WebcamModalComponent
  ]
})
export class WebcamModalModule { }
