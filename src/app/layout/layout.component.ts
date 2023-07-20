import { Component } from '@angular/core';
import { RouteUri } from '../utils/vars';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public routeUri = new RouteUri();

  constructor(protected authService : AuthService){}


  saveEntrepot(){
    
  }
  logout(){
    this.authService.logout();
  }

}
