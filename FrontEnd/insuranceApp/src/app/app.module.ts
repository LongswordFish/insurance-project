import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientnavbarComponent } from './client-dashboard/clientnavbar/clientnavbar.component';
import { ClientfooterComponent } from './client-dashboard/clientfooter/clientfooter.component';
import { ClientmainComponent } from './client-dashboard/clientmain/clientmain.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientnavbarComponent,
    ClientfooterComponent,
    ClientmainComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
