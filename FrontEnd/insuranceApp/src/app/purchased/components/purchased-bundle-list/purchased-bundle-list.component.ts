import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PurchasedBundle } from '../../models/PurcahsedBundle.type';
import { PurchasedProduct } from '../../models/PurchasedProduct.type';
import { PurchasedService } from '../../services/purchased.service';

@Component({
  selector: 'app-purchased-bundle-list',
  templateUrl: './purchased-bundle-list.component.html',
  styleUrls: ['./purchased-bundle-list.component.css']
})
export class PurchasedBundleListComponent {
  dataSource!: MatTableDataSource<any>
  obs!:Observable<any>
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  displayedColumns: string[] = ['b'];
  private pBList:PurchasedBundle[];
  private ppList:PurchasedProduct[];
  searchText:string="";
  constructor(private purchasedService:PurchasedService){
    this.pBList=[];
    this.ppList=[];
  }

  ngOnInit(): void {
    let clientId=sessionStorage.getItem('Userid');
    this.purchasedService.fetchPurchasedBundleDataByClientId(clientId);
    this.purchasedService.getPurchasedBundleData().subscribe(
      res=>{
        this.pBList=this.getBundles(res);
        this.dataSource = new MatTableDataSource<any>(this.pBList);
        this.dataSource.paginator = this.paginator
        this.obs = this.dataSource.connect();
      }
    );
  }

  getBundles(ppL:PurchasedProduct[]){
    this.ppList=ppL;
    this.pBList=this.ppList.filter(pp=>pp.bundleId!==null);
    let tempArray:[] = this.groupBy(this.pBList);
    let bundleIds:string[] = Object.keys(tempArray);
    let bundles:PurchasedBundle[]=[];
    bundleIds.forEach(bid=>{
      let bundle = new PurchasedBundle();
      bundle.bundleId=bid;
      bundle.productList=[];
      this.pBList.forEach((pp:PurchasedProduct)=>{
        if(pp.bundleId==bid) {
          bundle.productList?.push(pp);
          bundle.companyId=pp.companyId;
          bundle.purchaseDate=pp.purchaseDate;
          bundle.quotePrice=pp.quotePrice;
        }
      })
      bundles.push(bundle);
    })

    return bundles;
  }

  groupBy = (originalArray:any) =>{
      return originalArray.reduce((rv:any, pp:any)=> {
        (rv[pp['bundleId']] = rv[pp['bundleId']] || []).push(pp);
        return rv;
      }, {});
  }
}
