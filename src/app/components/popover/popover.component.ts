import { Component, OnInit } from '@angular/core';
import { RestproviderService } from '../../providers/restprovider.service';
import { Global } from '../../providers/global';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  categorias: any[];

  constructor(private restprovider: RestproviderService, public global: Global) {
    this.cargarCategorias();
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.restprovider.getCategorias().subscribe(
      res => {
        this.categorias = res as any[];
      },
      error => {
        console.log(error);
      }
    )
  }

  seleccionarCategoria(categoria) {
    localStorage.setItem('categoriaSeleccionada', categoria);
  }

}
