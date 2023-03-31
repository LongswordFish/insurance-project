import { Component, Input } from '@angular/core';
import { PurchasedBundle } from '../../models/PurcahsedBundle.type';
import { PurchasedService } from '../../services/purchased.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasedProduct } from '../../models/PurchasedProduct.type';

@Component({
  selector: 'app-purchased-bundle-card',
  templateUrl: './purchased-bundle-card.component.html',
  styleUrls: ['./purchased-bundle-card.component.css']
})
export class PurchasedBundleCardComponent {
  @Input()
  bundle:PurchasedBundle={};
  
  private clientId:string|null="";

  constructor(private ppService:PurchasedService, private _snackBar:MatSnackBar){}

  ngOnInit(): void {

  }
  onDelete(pps:PurchasedProduct[]):void{
    let ppids = pps.map(pp=>pp.ppId);
    let clientId = sessionStorage.getItem("Userid");
    
    if(clientId){
      console.log(ppids);
      this.ppService.deleteBundleByPPIds(ppids,clientId).subscribe(
        (res:any)=>{
          this._snackBar.open("Bundle deleted", "close");
        }
      )
    }
    
  }
}
