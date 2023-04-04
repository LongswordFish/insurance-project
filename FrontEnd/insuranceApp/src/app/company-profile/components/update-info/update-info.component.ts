import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyDataService } from '../../services/company-data.service';
import { CompanyModel } from '../../models/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit{
  company: any;
  contactDetails: any;
  form!: FormGroup;
  companyObj: CompanyModel = new CompanyModel();
  default = "default string";

  constructor(private api:CompanyDataService, private router: Router, private fb: FormBuilder) { 
  }

  ngOnInit() {
    let userId = sessionStorage.getItem("Userid");
    if (userId) {
      this.api.getOneCompany(parseInt(userId)).subscribe(res => {
        this.company = res;
        this.contactDetails = JSON.parse(this.company.contactDetails);
  
        this.form = this.fb.group({
          description: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          country: ['', Validators.required],
          postalcode: ['', Validators.required],
          email: ['', Validators.required],
          phone: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
          fax: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
          website: ['', Validators.required],
          instagram: ['', Validators.required]
        });
  
        this.form.patchValue({
          description: this.company.description,
          address: this.company.address,
          city: this.company.city,
          state: this.company.state,
          country: this.company.country,
          postalcode: this.company.postalCode,
          email: this.company.email,
          phone: this.contactDetails.Phone,
          fax: this.contactDetails.Fax,
          website: this.contactDetails.Website,
          instagram: this.contactDetails.Instagram
        });
      });
    }
  }

  // Retrieve company information for profile 
  getCompany(id: number) {
    this.api.getOneCompany(id).subscribe(res => {
      this.company = res; 
      this.contactDetails = JSON.parse(this.company.contactDetails);
    })
  }

  onButtonClickSubmit() {
    this.companyObj.companyId = this.company.companyId;
    this.companyObj.name = this.company.name;
    this.companyObj.email = this.form.value.email;
    this.companyObj.description = this.form.value.description;
    this.companyObj.address = this.form.value.address;
    this.companyObj.city = this.form.value.city;
    this.companyObj.state = this.form.value.state;
    this.companyObj.country = this.form.value.country;
    this.companyObj.postalCode = this.form.value.postalcode;
    this.companyObj.logo = this.company.logo;  
    this.companyObj.isApproved = this.company.isApproved;
    this.companyObj.adminViewed = this.company.adminViewed;
    this.companyObj.dateRegistered = this.company.dateRegistered;
    this.companyObj.dateApproved = this.company.dateApproved;

    var contactsJSON = {
      "Fax": this.form.value.fax,
      "Phone": this.form.value.phone,
      "Website": this.form.value.website,
      "Instagram": this.form.value.instagram
    };
    this.companyObj.contactDetails = JSON.stringify(contactsJSON);

    console.log(this.company);
    console.log(this.companyObj);

    this.api.updateCompany(this.companyObj, this.company.companyId).subscribe(res => {
      alert("Profile has been updated successfully!");
      this.router.navigate(['/company-profile']);
    }, 
    err => { alert("Failed to update profile, please try again"); }
    );
  }

  onButtonClickCancel() {
    this.router.navigate(['/company-profile']);
  }
}
