import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
import { RestproviderService } from '../providers/restprovider.service';
import { Global } from '../providers/global';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: any[];
  _sanitizer: DomSanitizer;

  constructor(public sanitizer: DomSanitizer, public global: Global, public popoverController: PopoverController, public toastController: ToastController, public restprovider: RestproviderService) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this._sanitizer = this.sanitizer;
    this.restprovider.getNoticias().subscribe(
      res => {
        this.noticias = res as any[];
      },
      error => {
        this.presentToast(error['error']);
      }
    )
  }

  cargarNoticiasPorCategoria() {

  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
