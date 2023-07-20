import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from './exception/error404/error404.component';
//import { ChallengeGuard } from './utils/guard/challenge.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
