import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../services/review.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewreview',
  templateUrl: './viewreview.component.html',
  styleUrls: ['./viewreview.component.css']
})
export class ViewreviewComponent {
  reviewForm: FormGroup;
  clientId:any;

  ngOnInit() {
    this.clientId = sessionStorage.getItem("Userid");
  }

constructor(dialogRef:MatDialogRef<ViewreviewComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,private revserv:ReviewService, private http:HttpClient )
{
  this.reviewForm = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    description: new FormControl({ value: '', disabled: true }),
    rating: new FormControl({ value: '', disabled: true })
  });



this.http.get(`http://localhost:9097/review/view/${data.revId}`).subscribe((review: any) => {
      // Populate form with review data
      this.reviewForm.setValue({
        title: review.reviewTitle,
        description: review.feedback,
        rating: review.rating,
      });
    });

  }
  
}
