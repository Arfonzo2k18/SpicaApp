import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  MenuController,
  LoadingController
} from "@ionic/angular";
import { RestproviderService } from "../providers/restprovider.service";
import { Global } from "../providers/global";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.page.html",
  styleUrls: ["./noticias.page.scss"]
})
export class NoticiasPage implements OnInit {
  noticias: any[];
  usuarioLogged: any;

  isLoading = false;

  categorias: any[];
  categoriasjson: {};
  selected = [];

  // tslint:disable-next-line:max-line-length
  constructor(
    public global: Global,
    public toastController: ToastController,
    public restprovider: RestproviderService,
    public loadingController: LoadingController,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.cargarNoticias();
    this.cargarCategorias();
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioLogged = this.restprovider.extraertoken();
  }

  onLogout() {
    this.menu.close("first");
    this.restprovider.deleteToken();
  }

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  doRefresh(event) {
    this.restprovider.getNoticias().subscribe(
      res => {
        this.noticias = res as any[];
        event.target.complete();
      },
      error => {
        this.presentToast(error.error);
      }
    );

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  cargarNoticias() {
    this.present();
    this.restprovider.getNoticias().subscribe(
      res => {
        this.noticias = res as any[];
        this.dismiss();
      },
      error => {
        this.presentToast(error.error);
      }
    );
  }

  cargarCategorias() {
    this.present();
    this.restprovider.getCategorias().subscribe(
      res => {
        this.categorias = res as any[];
        this.dismiss();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  cargarNoticiasPorCategoria(id) {
    this.present();
    this.restprovider.getNoticiasPorCategoria(id).subscribe(
      res => {
        this.noticias = res as any[];
        console.log(res);
        this.dismiss();
      },
      error => {
        this.noticias = null;
        this.dismiss();
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

  async present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 5000
      })
      .then(a => {
        a.present().then(() => {
          console.log("presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort presenting"));
          }
        });
      });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("dismissed"));
  }

  seleccionarNoticia(noticiaseleccionada) {
    localStorage.setItem("noticia", JSON.stringify(noticiaseleccionada));
  }
}
