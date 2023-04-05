import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaimserviceService } from '../claimservice.service';
import { Claim } from '../Model/Claim';
import {MatDialog} from '@angular/material/dialog';
import { ClaimDocument } from '../Model/ClaimDocument';
import { NotificationServiceService } from 'src/app/notification/service/notification-service.service';
import { Notification } from 'src/app/notification/model/notification';
import { RoutingService } from 'src/app/purchased/services/routing.service';

@Component({
  selector: 'app-claim-create',
  templateUrl: './claim-create.component.html',
  styleUrls: ['./claim-create.component.css']
})
export class ClaimCreateComponent {
  claimForm!: FormGroup;
  notify : Notification = new Notification();
  senderIdForNotification = sessionStorage.getItem("Userid") as String;

  role = sessionStorage.getItem("role");
  Userid = sessionStorage.getItem("Userid");
  productId = sessionStorage.getItem("productId");
  companyId = sessionStorage.getItem("companyId");

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private claimservice:ClaimserviceService,
    private notificationservice: NotificationServiceService,
    private routingService:RoutingService
  ) {
    this.createForm();
  }

  createForm() {

    if(this.Userid != null && this.productId != null && this.companyId != null){
      
      this.claimForm = this.fb.group({
        customerId: [{value: this.Userid, disabled: true}, Validators.required],
        productId: [{value: this.productId, disabled: true}, Validators.required],
        companyId: [{value: this.companyId, disabled: true}, Validators.required],
        description: ['', Validators.required],
        notes: ['']
    });
    

    }else{
      this.claimForm = this.fb.group({
        customerId: ['', Validators.required],
        productId: ['', Validators.required],
        companyId: ['', Validators.required],
        description:['', Validators.required],
        notes:['']
      });
    }

  }

  onSubmit() {
    const newClaim = new Claim();
    newClaim.customerId = this.claimForm.controls['customerId'].value;
    newClaim.productId = this.claimForm.controls['productId'].value;
    newClaim.companyId = this.claimForm.controls['companyId'].value;
    newClaim.description = this.claimForm.value.description;
    newClaim.notes = this.claimForm.value.notes;

    this.notify.senderId = this.senderIdForNotification;
    this.notify.message= "Claim Added!"
    this.notify.recipientId= this.claimForm.value.companyId;
    this.notify.read = false;
    console.log(newClaim);
    this.claimservice.addClaim(newClaim).subscribe(
      () => {
        this.claimForm.reset();
        const res = this.notificationservice.createNotification(this.notify).subscribe();
        console.log(res);
        this.snackBar.open('Claim added successfully and Notification sent to the company', 'Close', {
          duration: 3000
        });

        this.routingService.openMyPlans();

      },
      error => {
        this.snackBar.open('Error adding claim', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
