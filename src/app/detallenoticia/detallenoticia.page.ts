import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestproviderService } from '../providers/restprovider.service';
import { Global } from '../providers/global';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detallenoticia',
  templateUrl: './detallenoticia.page.html',
  styleUrls: ['./detallenoticia.page.scss'],
})
export class DetallenoticiaPage implements OnInit {

  noticiaSelected: any;
  noticia: any;
  // tslint:disable-next-line:variable-name
  _sanitizer: DomSanitizer;

  // tslint:disable-next-line:max-line-length
  constructor(public route: ActivatedRoute, public restprovider: RestproviderService, public global: Global, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.recogerId();
  }

  recogerId() {
    this._sanitizer = this.sanitizer;
    this.route.params.subscribe(params => {
      this.noticiaSelected = params['id'];
      this.noticia = JSON.parse(localStorage.getItem('noticia'));
    });
  }

}
