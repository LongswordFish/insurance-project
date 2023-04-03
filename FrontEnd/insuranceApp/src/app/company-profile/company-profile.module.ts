import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateInfoComponent
  ],
  imports: [
    CommonModule,
    CompanyProfileRoutingModule,
    NgbModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CompanyProfileModule { }
