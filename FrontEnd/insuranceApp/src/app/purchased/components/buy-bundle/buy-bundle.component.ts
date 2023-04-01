import { Component } from '@angular/core';
import { PurchasedBundle } from '../../models/PurcahsedBundle.type';
import { PpProductService } from '../../services/pp-product.service';
import { PurchasedService } from '../../services/purchased.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingService } from '../../services/routing.service';
import { BundleService } from 'src/app/bundle.service';
import { PpBundleService } from '../../services/pp-bundle.service';
import { pp_Bundle } from '../../models/pp-Bundle.type';
import { PurchasedProduct } from '../../models/PurchasedProduct.type';
import { pp_Product } from '../../models/pp-Product.type';

@Component({
  selector: 'app-buy-bundle',
  templateUrl: './buy-bundle.component.html',
  styleUrls: ['./buy-bundle.component.css']
})
export class BuyBundleComponent {
  bid:string="";
  bundle:pp_Bundle={};

  constructor(private productService:PpProductService,
              private ppService:PurchasedService,
              private _snackBar:MatSnackBar,
              private routingService:RoutingService,
              private bundleService:PpBundleService){
  }

  ngOnInit(): void {

    let o = sessionStorage.getItem("bid");
    if(o!=undefined){
      this.bid=o;
    }

    this.bundleService.fetchBundleByProductIdObs(this.bid).subscribe(
      (res:PurchasedBundle)=>{
        this.bundle=res;
        this.bundle.productList=[];
        this.bundle.productids?.forEach(pid=>{
          this.productService.fetchProductByProductId(pid).subscribe(p=>this.bundle.productList?.push(p));
        })
        console.log(this.bundle.productList);
      }
    );


  }

  addToAccount(){
    let ppListToPost : PurchasedProduct[]=[];
    this.bundle.productList?.forEach(p=>{
      ppListToPost.push(this.createPPFromProduct(p));
    })
    
    this.ppService.postPurchasedList(ppListToPost).subscribe(res=>{
      this._snackBar.open("Bundle added to your account", "close");
      sessionStorage.removeItem("bid");
      this.routingService.openMyPlans();
    });

  }

  createPPFromProduct(p:pp_Product){
    let pp = new PurchasedProduct();
    let clientId=sessionStorage.getItem("Userid");
    pp.productId=p.productId;
    pp.clientId=clientId!=undefined?clientId:"";
    pp.companyId=p.companyId;
    pp.location=this.bundle.location;
    pp.quotePrice=this.bundle.totalPrice;
    pp.bundleId=this.bundle.bundleid;
    return pp;
  }
}
