import { Component } from '@angular/core';

@Component({
  selector: 'app-side-company-dash',
  templateUrl: './side-company-dash.component.html',
  styleUrls: ['./side-company-dash.component.css']
})
export class SideCompanyDashComponent {
  role:any;

  constructor(){
    this.role=sessionStorage.getItem("role");
  }
}
