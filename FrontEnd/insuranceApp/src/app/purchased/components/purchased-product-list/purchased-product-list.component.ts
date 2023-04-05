import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { PurchasedProduct } from 'src/app/purchased/models/PurchasedProduct.type';
import { PurchasedService } from 'src/app/purchased/services/purchased.service';
import { ProductCategoryFilterPipe } from '../../pipes/product-category-filter.pipe';
import { ProductNameFilterPipe } from '../../pipes/product-name-filter.pipe';

@Component({
  selector: 'app-purchased-product-list',
  templateUrl: './purchased-product-list.component.html',
  styleUrls: ['./purchased-product-list.component.css']
})
export class PurchasedProductListComponent {
  dataSource!: MatTableDataSource<any>
  obs!:Observable<any>
  @ViewChild(MatPaginator)
  paginator !:MatPaginator;
  displayedColumns: string[] = ['p'];

  private ppList:PurchasedProduct[];

  searchText:string="";
  category:string="All";
  categories:string[]=["All","Auto","Life","House"];

  constructor(private purchasedService:PurchasedService,
            private categoryFilter: ProductCategoryFilterPipe,
            private nameFilter:ProductNameFilterPipe){
    this.ppList=[];
  }

  ngOnInit(): void {
    let clientId=sessionStorage.getItem('Userid');
    this.purchasedService.fetchPurchasedDataByClientId(clientId);
    this.purchasedService.getPurchasedData().subscribe(
      res=>{
        
        this.ppList=res;
        console.log(this.ppList);
        this.dataSource = new MatTableDataSource<any>(this.ppList);
        this.dataSource.paginator = this.paginator
        this.obs = this.dataSource.connect();
      }
    );
  }

  search(){

  }

  searchTextChange(value:string){
    let source = this.nameFilter.transform(this.ppList,value);
    source=this.categoryFilter.transform(source,this.category);
    this.dataSource = new MatTableDataSource<any>(source);
    this.dataSource.paginator = this.paginator
    this.obs = this.dataSource.connect()
  }

  categoryChange(value:string){
    let source = this.nameFilter.transform(this.ppList,this.searchText);
    source=this.categoryFilter.transform(source,value);
    this.dataSource = new MatTableDataSource<any>(source);
    this.dataSource.paginator = this.paginator
    this.obs = this.dataSource.connect()
  }
}
