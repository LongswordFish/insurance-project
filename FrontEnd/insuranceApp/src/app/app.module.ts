import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientnavbarComponent } from './client-dashboard/clientnavbar/clientnavbar.component';
import { ClientfooterComponent } from './client-dashboard/clientfooter/clientfooter.component';
import { ClientmainComponent } from './client-dashboard/clientmain/clientmain.component';
import { ViewProductComponent } from './client-dashboard/view-product/view-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './shared/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

@NgModule({
  declarations: [
    AppComponent,
    ClientnavbarComponent,
    ClientfooterComponent,
    ClientmainComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
