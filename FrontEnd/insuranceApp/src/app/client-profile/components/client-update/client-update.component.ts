import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientDataService } from '../../services/client-data.service';
import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit
{
  client: any;
  form!: FormGroup;
  clientObj: ClientModel = new ClientModel();
  default = "default string";

  constructor(private api:ClientDataService, private router: Router, private fb: FormBuilder) { 
  }

  ngOnInit() {
    let userId = sessionStorage.getItem("Userid");
    if (userId) {
      this.api.getOneClient(parseInt(userId)).subscribe(res => {
        this.client = res;
  
        this.form = this.fb.group({
          clientName: ['', Validators.required],
          location: ['', Validators.required],
          email: ['', Validators.required]
        });
  
        this.form.patchValue({
          clientName: this.client.clientName,
          location: this.client.location,
          email: this.client.email
        });
      });
    }
  }

  onButtonClickSubmit() {
    this.clientObj.clientId = this.client.clientId;
    this.clientObj.clientName = this.form.value.clientName;
    this.clientObj.email = this.form.value.email;
    this.clientObj.location = this.form.value.location;

    this.api.updateClient(this.clientObj, this.client.clientId).subscribe(res => {
      alert("Profile has been updated successfully!");
      this.router.navigate(['/client-profile']);
    }, 
    err => { alert("Failed to update profile, please try again"); }
    );
  }

  onButtonClickCancel() {
    this.router.navigate(['/client-profile']);
  }  
}
