import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';

const routes: Routes = [
  { path: '',    component: ProfileComponent },
  { path: 'update',    component: UpdateInfoComponent },
];

export const routedComponents = [ProfileComponent, UpdateInfoComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
