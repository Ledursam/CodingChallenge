import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { EntrepotsComponent } from './entrepots/entrepots.component';
import { SaveEntrepotComponent } from './save-entrepot/save-entrepot.component';
import { EditEntrepotComponent } from './edit-entrepot/edit-entrepot.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    EntrepotsComponent,
    SaveEntrepotComponent,
    EditEntrepotComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
