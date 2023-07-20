
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaveEntrepotComponent } from './save-entrepot/save-entrepot.component';
import { EditEntrepotComponent } from './edit-entrepot/edit-entrepot.component';
import { EntrepotsComponent } from './entrepots/entrepots.component';
import { LayoutComponent } from './layout.component';

import { ChallengeGuard } from '../utils/guard/challenge.guard';
import { RouteUri } from '../utils/vars';

const routeUri = new RouteUri();
const routes: Routes = [
    {
      path: routeUri.LAYOUT.RACINE.NAME, component: LayoutComponent,
      canActivate: [ChallengeGuard],
      children: [
        {
          path: '',
          canActivateChild: [ChallengeGuard],
          children: [
            { path: routeUri.LAYOUT.ENTREPOTS.NAME, component: EntrepotsComponent },
            { path: routeUri.LAYOUT.ENTREPOTS_SAVE.NAME, component: SaveEntrepotComponent },
            { path: routeUri.LAYOUT.ENTREPOT_EDIT.NAME, component: EditEntrepotComponent },
            { path: '', redirectTo: routeUri.LAYOUT.ENTREPOTS.NAME, pathMatch: 'full' }
          ]
        }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ChallengeGuard]
  })
  
  export class LayoutRoutingModule { }