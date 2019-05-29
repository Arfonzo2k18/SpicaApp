import { Component, OnInit } from '@angular/core';
import { RestproviderService } from '../providers/restprovider.service';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  fichero: File = null;
  fileUrl: any = null;
  respData: any;
  formulario = {}

  constructor(private restprovider: RestproviderService, private toastController: ToastController) { }

  ngOnInit() { }

  onImageSelected(event) {
    this.fichero = event.target.files[0];
    console.log(this.fichero);
  }

  onSubmit() {
    this.restprovider.register(this.formulario, this.fichero).subscribe(
      res => {
        this.presentToast(res);
      },
      error => {
        this.presentToast(error['error']);
      }
    )
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
