import { Component } from '@angular/core';
import { RestproviderService } from '../providers/restprovider.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [RestproviderService]
})
export class HomePage {

  formulario = {};

  constructor(public restprovider: RestproviderService, public toastController: ToastController, public router: Router) { }

  onSubmit() {
    this.restprovider.login(this.formulario).subscribe(
      res => {
        this.presentToast('¡Has iniciado sesión correctamente!');
        this.restprovider.setToken(res['token']);
        this.router.navigate(['/noticias']);
      },
      error => {
        this.presentToast(error['error']);
      }
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
