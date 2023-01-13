import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;
  loader: any;

  constructor(private loadingController:LoadingController) {

   }

   showLoader() {
    this.isLoading = true;
    this.loadingController.create({
      message: 'Processing Server Request'
    }).then((res) => {
      this.loader = res;
      this.loader.present().then(() => {
        if (!this.isLoading) {
          this.loader.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async hideLoader() {
    console.log("hideLoader called")
    this.isLoading = false;
    if(this.loader != null){
      return await this.loader.dismiss().then(() => console.log('dismissed'));
    }
  }
}
