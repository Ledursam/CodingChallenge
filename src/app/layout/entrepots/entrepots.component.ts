import { Component, OnInit} from '@angular/core';
import { RouteUri } from '../../utils/vars';
import { Router } from '@angular/router';
import { Entrepot } from '../../utils/models/entrepot.model';
import { EntrepotService } from '../../utils/services/layout/entrepots.service';
import iziToast from 'izitoast';
import Swal from 'sweetalert2';
declare var $:any;  

@Component({
  selector: 'app-entrepots',
  templateUrl: './entrepots.component.html',
  styleUrls: ['./entrepots.component.css']
})
export class EntrepotsComponent implements OnInit {
  list : Entrepot[] = [];
  loadingController : string = "";
  public routeUri: RouteUri = new RouteUri();



  constructor(protected entrepotService: EntrepotService, protected router: Router) { }

  ngOnInit(): void {
      this.GetEntrepots();
  }

  async GetEntrepots()
  {
    this.loadingController = "chargement";
    this.entrepotService.list().subscribe((res:any)=>{
      this.list = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
      this.loadingController = "loaded";
    }, err => {
      iziToast.error({title:'Erreur', message: 'Impossible de récupérer la liste des entrepôts', position: 'topRight', overlay: false });
    })
  }

  async deleteEntrepot(entrepot: Entrepot){
    Swal.fire({
      title: 'Confirmer la suppression ?',
      text: "Cette action est irreversible",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#cd853f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrepotService.delete(entrepot);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  async chooseEntrepot(idEntrepot: any)
  {
    this.router.navigate([this.routeUri.LAYOUT.ENTREPOT_EDIT.ROUTE, {id: idEntrepot}]).then();
  }



}
