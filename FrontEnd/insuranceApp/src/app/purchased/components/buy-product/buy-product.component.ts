import { Component, OnInit } from '@angular/core';
import { PpProductService } from '../../services/pp-product.service';
import { pp_Product } from '../../models/pp-Product.type';
import { PurchasedProduct } from '../../models/PurchasedProduct.type';
import { pp_Location } from '../../models/pp-Location.type';
import { PurchasedService } from '../../services/purchased.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
import { NgModule }      from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingService } from '../../services/routing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
  pid:string="";
  product:pp_Product={};
  chosen_location:pp_Location={};
  selected:string="None";
  locationform:FormGroup;

  constructor(private productService:PpProductService,
              private ppService:PurchasedService,
              private _snackBar:MatSnackBar,
              private routingService:RoutingService,
              private activatedRoute: ActivatedRoute){
                this.locationform = new FormGroup({
                  sLocation: new FormControl('', [Validators.required])
                });
  }

  ngOnInit(): void {
    let o = this.activatedRoute.snapshot.paramMap.get('productId');
    if(o!=undefined) this.pid=o;

    this.productService.fetchProductByProductId(this.pid).subscribe(
      res=>this.product=res
    );
    this.chosen_location.locationName="None"
  }

  addToAccount(){
    let pp = new PurchasedProduct();
    let clientId=sessionStorage.getItem("Userid");
    pp.productId=this.product.productId;
    pp.productName=this.product.name;
    pp.productCategory=this.product.category;
    pp.clientId=clientId!=undefined?clientId:"";
    pp.companyId=this.product.companyId;
    this.product.locations?.forEach(l=>{
      if(l.locationName==this.selected){
        pp.location=l.locationName;
        pp.quotePrice=Number(l.locationPrice);
      }
    })
    
    this.ppService.postPurchased(pp).subscribe(res=>{
      this._snackBar.open("Record added", "close");
      this.routingService.openMyPlans();
    });

  }

}
