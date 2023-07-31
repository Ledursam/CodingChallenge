import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteUri } from 'src/app/utils/vars';
import { EntrepotService } from '../../utils/services/layout/entrepots.service';
import { FormBuilder, FormControl, Validators,FormGroup } from '@angular/forms';
import iziToast from 'izitoast';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-edit-entrepot',
  templateUrl: './edit-entrepot.component.html',
  styleUrls: ['./edit-entrepot.component.css']
})
export class EditEntrepotComponent {

  entrepotID: string  = '';
  entrepotForm : FormGroup = new FormGroup({});
  public routeUri: RouteUri = new RouteUri();

  constructor(protected activatedroute: ActivatedRoute, protected location: Location, protected entrepotService: EntrepotService, protected fb: FormBuilder,
    protected router: Router) {
    this.entrepotForm = this.fb.group({
      libelle:[ '', Validators.required],  superficie: [ 0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      emplacement: [ '', Validators.required], longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]], 
      latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]]
    })
   }

  ngOnInit(): void {
    $('#linkentrepot').addClass('active');
    this.entrepotID = this.activatedroute.snapshot.paramMap.get('id')!;
    this.GetEntrepotToEdit();
  }

  ngOnDestroy() {
    $('#linkentrepot').removeClass('active');
  }

  GetEntrepotToEdit() {
    if(this.entrepotID !== null) { 
      this.entrepotService.getEntrepot(this.entrepotID).subscribe((res:any) => {
      this.entrepotForm.setValue({
        libelle: res.payload.data()['libelle'],
        superficie: res.payload.data()['superficie'],
        emplacement: res.payload.data()['emplacement'],
        longitude: res.payload.data()['longitude'],
        latitude: res.payload.data()['latitude'],
      })
      console.log(this.entrepotForm.value);
    })
  }
  }

  validateForm(){
    if(this.entrepotForm.invalid)
    {
      iziToast.warning({ title: 'Attention', message: "Les champs suivis de * sont obligatoires", position: 'topRight', overlay: false });
      return false;
    }
    return true;
  }

  UpdateEntrepot(){
    if(this.validateForm()){
      Swal.fire({
        title: 'Confirmer Modification ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#cd853f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          this.entrepotService.update(this.entrepotID, this.entrepotForm.value);
          iziToast.success({ title: 'Succès', message: 'Les modifications ont été effectuées', position: 'topRight', overlay: false });
          this.router.navigate([this.routeUri.LAYOUT.ENTREPOTS.ROUTE]);
        }
      })
    }
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
