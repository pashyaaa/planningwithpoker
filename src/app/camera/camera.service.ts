import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, CameraOptions } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  getPicture() {
    const options: CameraOptions = {
      quality: 30,
      resultType: CameraResultType.Base64,
      correctOrientation: true,
      source: CameraSource.Camera,
      allowEditing: false
    };

    return Plugins.Camera.getPhoto(options)
  }

  selectPicture() {
    const options: CameraOptions = {
      quality: 30,
      resultType: CameraResultType.Base64,
      correctOrientation: true,
      source: CameraSource.Prompt,
      allowEditing: false
    };

    return Plugins.Camera.getPhoto(options)
  }

}
