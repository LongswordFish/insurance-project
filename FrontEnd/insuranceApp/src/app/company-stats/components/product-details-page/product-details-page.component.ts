import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client';
import { Review } from '../../models/review';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent {

  productID!: string;
  listClientIDs: Array<any> = [];
  listClients!: Client[];
  listReviews: Array<Review> = [];
  clientsArr: Array<Client> = [];

  displayedColumns: string[] = ["id", "name", "location", "email"];
  displayedReviewColumns: string[] = ["reviewId", "reviewCreated_date", "reviewTitle", "rating", "feedback", "customerId"];

  dataSourceClient!: MatTableDataSource<Client>
  dataSourceReview!: MatTableDataSource<Review>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute,
              private clientService: ClientService) {

    this.route.queryParams.subscribe(params => {
      this.productID = params['productID'];
    console.log(this.productID);
    });

    
    //making api call to fetch all purchaed products by giving productID: this return [] where each obj has same productID but different clientID
    this.clientService.getAllPurhcasedProducts(this.productID)
                      .subscribe((response) => {
                        // this.purchasedProduct = response;
                        console.log(response);

                        this.listClientIDs = response.map( (ele: { clientId: any; }) => ele.clientId); 
                        
                        // this.listClientIDs = [...new Set(this.listClientIDs)];
                        this.listClientIDs = Array.from(new Set(this.listClientIDs).values());
                        // console.log(this.listClientIDs);

                        // Call getClientDetails for each clientID
                        for (const clientId of this.listClientIDs) {
                          this.loadClients(clientId);
                        } 
                        console.log(this.clientsArr);


                      }, (err) => {
                        console.log(err);
                      })

    //load the reviews
    this.loadReviews(this.productID);
  }


  loadClients(clientId: number){
    this.clientService.getClientDetailsByClientID(clientId)
    .subscribe((response) => {
      console.log(response); //check this
      this.clientsArr.push(response);

      //assign data source here
      this.dataSourceClient = new MatTableDataSource(this.clientsArr);
      this.dataSourceClient.paginator = this.paginator;
      this.dataSourceClient.sort = this.sort;
    }, (err) => {
      console.log(err);
    })
  }

  //function for filtering?: searchBar
  applyFilterClients(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClient.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClient.paginator) {
      this.dataSourceClient.paginator.firstPage();
    }
  }

  //function for filtering?: searchBar
  applyFilterReviews(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceReview.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceReview.paginator) {
      this.dataSourceReview.paginator.firstPage();
    }
  }

  loadReviews(productID: string){
    this.clientService.getReviewsByProductID(productID)
                      .subscribe((response) => {
                        console.log(response);
                        this.listReviews = response as unknown as Review[];

                        this.dataSourceReview = new MatTableDataSource(this.listReviews);
                        this.dataSourceReview.paginator = this.paginator;
                        this.dataSourceReview.sort = this.sort;
                        // console.log(this.listReviews);
                      }, (err) => {
                        console.log(err);
                      })
  }

}
