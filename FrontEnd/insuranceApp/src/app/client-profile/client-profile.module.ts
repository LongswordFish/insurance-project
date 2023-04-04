import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientUpdateComponent } from './components/client-update/client-update.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ClientProfileComponent,
    ClientUpdateComponent
  ],
  imports: [
    CommonModule,
    ClientProfileRoutingModule,
    NgbModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ DatePipe ]
})
export class ClientProfileModule { }
