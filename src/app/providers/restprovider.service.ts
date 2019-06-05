import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RestproviderService {

  usuarioLogged: any;
  token: string;

  constructor(private global: Global, private http: HttpClient, private router: Router) { }

  login(credenciales) {
    const cuerpo = new FormData();
    cuerpo.append('email', credenciales.email);
    cuerpo.append('password', credenciales.password);
    return this.http.post(this.global.URL_API + '/login', cuerpo);
  }

  register(formulario, fichero) {
    const cuerpo = new FormData();
    cuerpo.append('nombre', formulario.nombre);
    cuerpo.append('nick', formulario.nick);
    cuerpo.append('email', formulario.email);
    cuerpo.append('password', formulario.password);
    cuerpo.append('image', fichero, fichero.name);
    return this.http.post(this.global.URL_API + '/registerAPP', cuerpo);
  }

  getCategorias() {
    return this.http.get(this.global.URL_API + '/categories');
  }

  getNoticias() {
    return this.http.get(this.global.URL_API + '/news');
  }

  getNoticiasPorCategoria(id) {
    return this.http.get(this.global.URL_API + '/newbycategoryid/' + id);
  }

  extraertoken() {
    const decodedToken = jwt_decode(sessionStorage.getItem('token'));
    if (decodedToken == null) {
      return null;
    } else {
      return decodedToken;
    }
  }

  setToken(token) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    sessionStorage.getItem('token');
  }

  deleteToken() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

}
