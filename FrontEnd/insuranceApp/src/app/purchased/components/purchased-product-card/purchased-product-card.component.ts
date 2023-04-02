import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { pp_Product } from 'src/app/purchased/models/pp-Product.type';
import { PpProductService } from 'src/app/purchased/services/pp-product.service';
import { PurchasedService } from '../../services/purchased.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { PpReviewService } from '../../services/pp-review.service';
import { pp_Review } from '../../models/pp-Review.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddreviewComponent } from '../addreview/addreview.component';
@Component({
  selector: 'app-purchased-product-card',
  templateUrl: './purchased-product-card.component.html',
  styleUrls: ['./purchased-product-card.component.css'],
  
})
export class PurchasedProductCardComponent implements OnChanges{
  @Input()
  productId:string="";

  @Input()
  ppId:string="";

  @Input()
  showDelete:boolean=true;

  @Input()
  searchText:string="";

  @Input()
  category="all";

  show:Boolean=true;

  product:pp_Product;

  pp_review:pp_Review;
  reviewList:any;
  currentRate = 0;
  clientId:string|null="";
  constructor(private ppProductService:PpProductService,
            private ppService:PurchasedService,
            private ppReviewService:PpReviewService,
            private _snackBar: MatSnackBar,
            private matdialogobj:MatDialog){
    this.product={};
    this.pp_review={};
    this.reviewList=[];
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if(this.searchText==""){
    //   if(this.category=="all" || this.product.category?.toLocaleLowerCase()==this.category.toLocaleLowerCase()){
    //     this.show=true;
    //   }else{
    //     this.show=false;
    //   }
    //   return;
    // }
    // if(this.product.name?.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())){
    //   if(this.category=="all" || this.product.category?.toLocaleLowerCase()==this.category.toLocaleLowerCase()){
    //     this.show=true;
    //   }else{
    //     this.show=false;
    //   }
    //   return;
    // }else{
    //   this.show=false;
    // }
  }

  ngOnInit(): void {
    this.clientId=sessionStorage.getItem('Userid');
    
    this.ppProductService.fetchProductByProductId(this.productId).subscribe(
      res=>{
        this.product=res;
      }
    );
    
    this.ppReviewService.fetchProductByProductId(this.productId).subscribe(
      res=>{
        this.reviewList=res;
        if(this.reviewList?.length>0){
          this.pp_review=this.reviewList[0];
          if(this.pp_review?.rating!=undefined){  
            this.currentRate=this.pp_review?.rating;
            console.log(this.productId+" "+this.currentRate);
          } 
        }
      },err=>{

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
    {
      this.matdialogobj.open(AddreviewComponent,{
        width:'50%',
        height:'50%',
        data:{compId : this.product.companyId, prodId:this.product.productId}
      }).afterClosed().subscribe (
        res=>
          {
            if (res==="Addreview")
            console.log("Review added successfully")
          }
      )
      }
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
