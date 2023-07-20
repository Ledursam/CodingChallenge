import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Entrepot } from "../../models/entrepot.model";

@Injectable({
  providedIn: 'root'
})

export class EntrepotService {

  constructor(protected afs: AngularFirestore) { }

  public list() {
    return this.afs.collection('/Entrepots').snapshotChanges();
  }

  public save(entrepot: Entrepot) {
    entrepot.id = this.afs.createId();
    return this.afs.collection('/Entrepots').add(entrepot)
  }

  public getEntrepot(id:string){
    return this.afs.collection('/Entrepots').doc(id).snapshotChanges();
  }

  public update(id:string, data:any) {
    return this.afs.collection('/Entrepots').doc(id).update(data)
  }

  public delete(entrepot: Entrepot) {
    return this.afs.doc('/Entrepots/' + entrepot.id).delete();
  }

}
