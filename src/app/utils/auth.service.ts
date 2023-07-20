import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUri, } from './vars';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import iziToast from "izitoast";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public routeUri: RouteUri = new RouteUri();

  constructor(protected router: Router, protected fireauth: AngularFireAuth) { 
  }

  //LOGIN METHOD
  doLogin(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate([this.routeUri.LAYOUT.ENTREPOTS.ROUTE]);
      iziToast.success({ title: 'Connexion', message: "Vous êtes connecté avec succès", position: 'topRight', overlay: false });
      localStorage.setItem('token', 'true');
    }, err => {
      iziToast.error({ message: err.message, position: 'topRight', overlay: false });
    })
  }

  register(email:string , password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      iziToast.success({ title: 'Inscription', message: "Vous êtes inscrit avec succès", position: 'topRight', overlay: false });
      this.router.navigate([this.routeUri.SECURITY.LOGIN.ROUTE]);
    }, err => {
      iziToast.error({ message: err.message, position: 'topRight', overlay: false });
    })
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    return token !== null && token !== '' && token !== undefined;
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate([this.routeUri.SECURITY.LOGIN.ROUTE]);
    }, err => {
      iziToast.error({ message: err.error.message, position: 'topRight', overlay: false });
    })
  }
}
