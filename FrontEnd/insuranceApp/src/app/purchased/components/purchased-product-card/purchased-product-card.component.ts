import { Component, Input } from '@angular/core';
import { pp_Product } from 'src/app/purchased/models/pp-Product.type';
import { PpProductService } from 'src/app/purchased/services/pp-product.service';
import { PurchasedService } from '../../services/purchased.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { PpReviewService } from '../../services/pp-review.service';
import { pp_Review } from '../../models/pp-Review.type';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-purchased-product-card',
  templateUrl: './purchased-product-card.component.html',
  styleUrls: ['./purchased-product-card.component.css'],
  
})
export class PurchasedProductCardComponent {
  @Input()
  productId:string="";

  @Input()
  ppId:string="";

  @Input()
  showDelete:boolean=true;

  product:pp_Product;

  pp_review:pp_Review;
  reviewList:any;
  currentRate = 0;
  clientId:string|null="";
  constructor(private ppProductService:PpProductService,
            private ppService:PurchasedService,
            private ppReviewService:PpReviewService,
            private _snackBar: MatSnackBar){
    this.product={};
    this.pp_review={};
    this.reviewList=[];
  }

  ngOnInit(): void {
    this.clientId=sessionStorage.getItem('Userid');
    this.ppProductService.fetchProductByProductId(this.productId).subscribe(
      res=>{
        this.product=res;
        console.log(res);
      }
    );
    
    this.ppReviewService.fetchProductByProductId(this.productId).subscribe(
      res=>{
        this.reviewList=res;
        this.pp_review=this.reviewList[0];
        this.currentRate=this.pp_review.rating!=null?this.pp_review.rating:0;
        
      }
    );
  }

  onDelete(ppid:any):void{
    this.ppService.deletePPByPPId(ppid).subscribe(
      (res:any)=>{
        this.ppService.fetchPurchasedDataByClientId(this.clientId);
        this._snackBar.open("Record deleted", "close");
      }
    )
  }

  addReview(){

  }

  addClaim(){
    if(this.product.productId!=undefined){
      sessionStorage.setItem("productId",this.product.productId);
    }
    if(this.product.companyId!=undefined){
      sessionStorage.setItem("companyId",this.product.companyId);
    }
    
  }
}
