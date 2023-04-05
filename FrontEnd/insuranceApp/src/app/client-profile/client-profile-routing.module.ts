import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientUpdateComponent } from './components/client-update/client-update.component';

const routes: Routes = [
  { path: '',    component: ClientProfileComponent },
  { path: 'update',    component: ClientUpdateComponent },
];

export const routedComponents = [ClientProfileComponent, ClientUpdateComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileRoutingModule { }
