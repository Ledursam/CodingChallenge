import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteUri } from 'src/app/utils/vars';
import { EntrepotService } from '../../utils/services/layout/entrepots.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
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
      libelle:[ '', Validators.required], superficie: [ 0, Validators.required],
      emplacement: [ '', Validators.required], longitude: 0,
      latitude: 0
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
  

  goBack() {
    this.location.back();
  }


}
