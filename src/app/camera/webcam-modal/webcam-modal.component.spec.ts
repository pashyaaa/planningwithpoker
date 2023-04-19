import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { IonicModule } from '@ionic/angular';

import { WebcamModalComponent } from './webcam-modal.component';
import { WebcamModule } from 'ngx-webcam';

describe('WebcamModalComponent', () => {
  let component: WebcamModalComponent;
  let fixture: ComponentFixture<WebcamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcamModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase), 
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        HttpClientModule,
        IonicModule,
        WebcamModule,
      ],
      providers:[
        Firebase,
        AngularFireMessaging,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
