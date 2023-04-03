import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaimserviceService } from '../claimservice.service';
import { Claim } from '../Model/Claim';
import {MatDialog} from '@angular/material/dialog';
import { ClaimDocument } from '../Model/ClaimDocument';

@Component({
  selector: 'app-claim-create',
  templateUrl: './claim-create.component.html',
  styleUrls: ['./claim-create.component.css']
})
export class ClaimCreateComponent {
  claimForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private claimservice:ClaimserviceService
  ) {
    this.createForm();
  }

  createForm() {
    this.claimForm = this.fb.group({
      customerId: ['', Validators.required],
      productId: ['', Validators.required],
      companyId: ['', Validators.required],
      description:['', Validators.required],
      notes:['']
    });
  }

  onSubmit() {
    const newClaim = new Claim();
    newClaim.customerId = this.claimForm.value.customerId;
    newClaim.productId = this.claimForm.value.productId;
    newClaim.companyId = this.claimForm.value.companyId;
    newClaim.description = this.claimForm.value.description;
    newClaim.notes = this.claimForm.value.notes;
    this.claimservice.addClaim(newClaim).subscribe(
      () => {
        this.claimForm.reset();
        this.snackBar.open('Claim added successfully', 'Close', {
          duration: 3000
        });
      },
      error => {
        this.snackBar.open('Error adding claim', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
