import { Component } from '@angular/core';
import { CompanyDataService } from '../../services/company-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  company: any;
  contactDetails: any;

  constructor(private api:CompanyDataService) { 
    this.getCompany(3);
  }

  // Retrieve company information for profile 
  getCompany(id: number) {
    this.api.getOneCompany(id).subscribe(res => {
      this.company = res; 
      this.contactDetails = JSON.parse(this.company.contactDetails);
    })
  }
}
