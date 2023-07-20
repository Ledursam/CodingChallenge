import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouteUri } from '../../utils/vars';
import { EntrepotService } from '../../utils/services/layout/entrepots.service';
import { Entrepot } from 'src/app/utils/models/entrepot.model';
import iziToast from 'izitoast';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-save-entrepot',
  templateUrl: './save-entrepot.component.html',
  styleUrls: ['./save-entrepot.component.css']
})
export class SaveEntrepotComponent implements  OnInit{
  public routeUri: RouteUri = new RouteUri();
  libelle: string = ""; superficie : number = 0;   placer : string = "";
  longitude : number = 0; latitude : number = 0;
  nouvelEntrepot : Entrepot = {
    id: '',
    libelle: '',
    superficie: 0,
    emplacement: '',
    longitude: 0,
    latitude: 0
  };

  constructor(protected entrepotService: EntrepotService, protected location: Location, protected router: Router) { }

  ngOnInit(): void {
      $('#linkentrepot').addClass('active');
  }

  ngOnDestroy(){
    $('#linkentrepot').removeClass('active');
  }

  checkForm(){
    if(this.libelle == '' || this.superficie == 0 || this.placer == ''){
      iziToast.warning({ title: 'Attention', message: "Les champs suivis de * sont obligatoires", position: 'topRight', overlay: false });
      return false;
    }
    return true;
  }

  addEntrepot (){
     if(this.checkForm()){

      this.nouvelEntrepot.libelle = this.libelle;
      this.nouvelEntrepot.superficie = this.superficie;
      this.nouvelEntrepot.emplacement = this.placer;
      this.nouvelEntrepot.longitude = this.longitude;
      this.nouvelEntrepot.latitude = this.latitude;

      //Message de confirmation
      Swal.fire({
        title: 'Enregister entrepôt ? ',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#cd853f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.entrepotService.save(this.nouvelEntrepot);
          iziToast.success({ title: 'Succès', message: 'Entrepot ajouté avec succès', position: 'topRight', overlay: false });
          this.router.navigate([this.routeUri.LAYOUT.ENTREPOTS.ROUTE]);
        }
      })

     }
  }
  goBack (){
    this.location.back();
  }

}
