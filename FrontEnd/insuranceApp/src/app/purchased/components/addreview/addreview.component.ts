import { Component, Inject } from '@angular/core';
import { pp_Review } from '../../models/pp-Review.type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../services/review.service';
import { PurchasedService } from '../../services/purchased.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent {
  review :pp_Review={};
  reviews: Array<pp_Review> =[];
  clientId:any;
  selected:any;

  ngOnInit() {
    this.clientId = sessionStorage.getItem("Userid");
  }

constructor(private dialogref:MatDialogRef<AddreviewComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,private revserv:ReviewService,
  private ppService:PurchasedService,
  private _snackBar:MatSnackBar
  )
{
   this.review.companyId=data.compId;
   this.review.productId=data.prodId;
   this.review.rating = this.selected;
   this.review.customerId=this.clientId;
}


addreview(){
  console.log(this.selected)
  this.review.rating = this.selected;
  this.review.customerId=this.clientId;
  this.revserv.saveReview(this.review).subscribe(
    res=>
    {
    this._snackBar.open("New review added!","close");
    this.ppService.fetchPurchasedDataByClientId(this.clientId);
  this.dialogref.close("Addreview")
    },
    err=>
    {
      console.log(err.error);
    }
  )
}

}
