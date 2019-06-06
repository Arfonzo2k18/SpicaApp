import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RestproviderService } from "../providers/restprovider.service";
import { Global } from "../providers/global";
import { DomSanitizer } from "@angular/platform-browser";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-detallenoticia",
  templateUrl: "./detallenoticia.page.html",
  styleUrls: ["./detallenoticia.page.scss"]
})
export class DetallenoticiaPage implements OnInit {
  noticiaSelected: any;
  noticia: any;
  comentarios: any[];
  usuarioLogged;
  comentarioSeleccionado: any;
  // tslint:disable-next-line:variable-name
  _sanitizer: DomSanitizer;
  @ViewChild("content") private content: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    public route: ActivatedRoute,
    public restprovider: RestproviderService,
    public global: Global,
    public sanitizer: DomSanitizer,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.content.scrollToTop(0);
    this.recogerId();
    this.cargarUsuario();
  }

  recogerId() {
    this._sanitizer = this.sanitizer;
    this.route.params.subscribe(params => {
      this.noticiaSelected = params["id"];
      this.noticia = JSON.parse(localStorage.getItem("noticia"));
      this.cargarComentarios();
    });
  }

  cargarUsuario() {
    this.usuarioLogged = this.restprovider.extraertoken();
  }

  goToComments() {
    this.content.scrollToBottom(300);
  }

  goToStart() {
    this.content.scrollToTop(100);
  }

  cargarComentarios() {
    this.restprovider.getComentariosPorNoticia(this.noticiaSelected).subscribe(
      res => {
        this.comentarios = res as any[];
      },
      error => {
        console.log(error);
      }
    );
  }

  crearComentario(cuerpo) {
    this.restprovider
      .createComment(this.usuarioLogged.id, cuerpo, this.noticiaSelected)
      .subscribe(
        res => {
          this.presentToast(res);
          this.cargarComentarios();
          console.log(res);
        },
        error => {
          console.log(error);
          this.presentToast(error.error["error"]);
        }
      );
  }

  editarComentario(valor) {
    this.restprovider
      .editComment(this.comentarioSeleccionado.id, valor)
      .subscribe(
        res => {
          this.presentToast(res);
          this.cargarComentarios();
          console.log(res);
        },
        error => {
          console.log(error);
          this.presentToast(error.error["error"]);
        }
      );
  }

  eliminarComentario(valor) {
    this.restprovider.deleteComment(valor).subscribe(
      res => {
        this.presentToast(res);
        this.cargarComentarios();
        console.log(res);
      },
      error => {
        console.log(error);
        this.presentToast(error.error["error"]);
      }
    );
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: "Crea tu comentario",
      inputs: [
        {
          name: "comment",
          type: "text",
          id: "comment-id",
          placeholder: "Introduce el cuerpo del comentario aquí..."
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Confirmar",
          handler: data => {
            this.crearComentario(data.comment);
          }
        }
      ]
    });

    await alert.present();
  }

  async abrirEdicion(selectedComment) {
    this.comentarioSeleccionado = selectedComment;
    const alert = await this.alertController.create({
      header: "Edita tu comentario",
      inputs: [
        {
          name: "comment",
          type: "text",
          id: "comment-id",
          placeholder: "Introduce el cuerpo del comentario aquí...",
          value: selectedComment.cuerpo
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Confirmar",
          handler: data => {
            this.editarComentario(data.comment);
          }
        }
      ]
    });

    await alert.present();
  }

  async abrirConfirmacion(selectedComment) {
    this.comentarioSeleccionado = selectedComment;
    const alert = await this.alertController.create({
      header: "¡Atención!",
      subHeader: "¿Estás segur@ de que quieres eliminar este comentario?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Confirmar",
          handler: () => {
            this.eliminarComentario(this.comentarioSeleccionado.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
