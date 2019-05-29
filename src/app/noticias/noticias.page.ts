import { Component, OnInit, ViewChild } from '@angular/core';
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
  popover: any;

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
  cargarNoticiasPorCategoria(id) {
    this.restprovider.getNoticiasPorCategoria(id).subscribe(
      res => {
        this.noticias = res['Noticias'] as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
    }).then(a => {
      a.present().then(() => {
        this.cargarNoticiasPorCategoria(localStorage.getItem("categoria"));
      });
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
