import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouteUri } from '../../utils/vars';
import { EntrepotService } from '../../utils/services/layout/entrepots.service';
import { Entrepot } from 'src/app/utils/models/entrepot.model';
import { FormBuilder, FormControl, Validators,FormGroup } from '@angular/forms';
import iziToast from 'izitoast';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-save-entrepot',
  templateUrl: './save-entrepot.component.html',
  styleUrls: ['./save-entrepot.component.css']
})
export class SaveEntrepotComponent implements OnInit {
  public routeUri: RouteUri = new RouteUri();

  entrepotForm : FormGroup = new FormGroup({});
  entrepot!: Entrepot;

  constructor(protected entrepotService: EntrepotService, protected location: Location, protected router: Router, protected fb: FormBuilder) 
  { this.entrepotForm = this.fb.group({
    libelle:[ '', Validators.required],  superficie: [ 1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    emplacement: [ '', Validators.required], longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]], 
    latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]]
  }) }

  ngOnInit(): void {
    $('#linkentrepot').addClass('active');
  }

  ngOnDestroy() {
    $('#linkentrepot').removeClass('active');
  }


  addEntrepot() {
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
          this.entrepotService.save(this.entrepotForm.value);
          //this.setAttributes();
          iziToast.success({ title: 'Succès', message: 'Entrepot ajouté avec succès', position: 'topRight', overlay: false });
          this.router.navigate([this.routeUri.LAYOUT.ENTREPOTS.ROUTE]);
        }
      })
    
  }

  get libelle(){
    return this.entrepotForm.get('libelle') as FormControl;
  }

  get superficie(){
    return this.entrepotForm.get('superficie') as FormControl;
  }

  get emplacement() {
    return this.entrepotForm.get('emplacement') as FormControl;
  }

  get longitude(){
    return this.entrepotForm.get('longitude') as FormControl;
  }

  get latitude(){
    return this.entrepotForm.get('latitude') as FormControl;
  }


  isSuperficieValid(){
    return  this.superficie.hasError('required') ? 'Le champ superficie est obligatoire' : 
    this.superficie.hasError('min') ? 'La superficie donnée doit être supérieure à 0' : 
    this.superficie.hasError('pattern') ? 'La superficie doit être un nombre' : '';
  }

  isLIbelleValid(){
    return this.libelle.hasError('required') ? 'Le champ libellé est obligatoire' : '';
  }

  isEmplacementValid(){
    return this.emplacement.hasError('required') ? 'Le champ emplacement est obligatoire' : '';
  }

  isLongitudeValid(){
    return this.longitude.hasError('required') ? 'Le champ longitude est obligatoire' : 
    this.longitude.hasError('min') ? 'La longitude donnée doit être supérieure ou égale à -180' :
    this.longitude.hasError('max') ? 'La longitude donnée doit être inférieure ou égale à 180' : '';
  }
  
  isLatitudeValid(){
    return this.latitude.hasError('required') ? 'Le champ latitude est obligatoire' : 
    this.latitude.hasError('min') ? 'La lattitude donnée doit être supérieure ou égale à -90' :
    this.latitude.hasError('max') ? 'La lattitude donnée doit être inférieure ou égale à 90' : '';
  }

  goBack() {
    this.location.back();
  }

}
