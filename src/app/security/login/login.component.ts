import { Component, OnInit } from '@angular/core';
import { RouteUri } from '../../utils/vars';
import { AuthService } from '../../utils/auth.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  email : string =''; 
  password : string = '';
  routeUri = new RouteUri();

  constructor(protected authService: AuthService) { }

  formCheck() : Boolean{
    if(this.email == '' || this.password == ''){
      iziToast.warning({ title: 'Erreur', message: "Veuillez remplir tous les champs", position: 'topRight', overlay: false });
      console.log(this.email);
      console.log(this.password);
      return false;
    }
    return true;
  }

  async login(){
    if(this.formCheck()){
      this.authService.doLogin(this.email, this.password);
    }
  }


}
