import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';

@NgModule({
  declarations: [
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ClientProfileModule { }