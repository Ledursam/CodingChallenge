import { Component } from '@angular/core';
import { RouteUri } from '../../utils/vars';
import iziToast from 'izitoast';
import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public routeUri: RouteUri = new RouteUri();
  email : string = '';
  password : string = '';
  confirmPassword : string = '';

  constructor(private authService: AuthService) { }

  checkForm():Boolean {

    if(this.email == '' || this.password == '' || this.confirmPassword == ''){
      iziToast.warning({ title: 'Attention', message: "Veuillez remplir tous les champs", position: 'topRight', overlay: false });
      return false;
    }

    if(this.password != this.confirmPassword){
      iziToast.error({ title: 'Erreur', message: "Les mots de passe ne correspondent pas", position: 'topRight', overlay: false });
      return false;
    }

    return true;
  }

  async register(){
    if(this.checkForm()){
      this.authService.register(this.email, this.password);
    }
  }

}
