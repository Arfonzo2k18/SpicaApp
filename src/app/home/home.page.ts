import { Component } from '@angular/core';
import { RestproviderService } from '../providers/restprovider.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Global } from '../providers/global';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [RestproviderService, OneSignal]
})
export class HomePage {

  formulario = {};

  constructor(private global: Global, private oneSignal: OneSignal, public restprovider: RestproviderService, public toastController: ToastController, public router: Router) {
    this.checkNotifications();
  }

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

  private checkNotifications() {
    this.oneSignal.startInit(this.global.onesignalKey, this.global.firebaseSender);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened().subscribe(jsonData => {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
  }

}
