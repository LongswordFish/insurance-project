import { Component } from '@angular/core';
import { CompanyDataService } from '../../services/company-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  company: any;
  contactDetails: any;

  constructor(private api:CompanyDataService, private router: Router) { 
    let userId = sessionStorage.getItem("Userid");
    if (userId) {
      this.getCompany(parseInt(userId));
    }
  }

  // Retrieve company information for profile 
  getCompany(id: number) {
    this.api.getOneCompany(id).subscribe(res => {
      this.company = res; 
      this.contactDetails = JSON.parse(this.company.contactDetails);
    })
  }

  onButtonClickUpdate() {
    this.router.navigate(['/company-profile/update']);
  }
}
