import { Component } from '@angular/core';
import { ClaimserviceService } from '../claimservice.service';
import { Claim } from '../Model/Claim';
import { ClaimDocument } from '../Model/ClaimDocument';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDataService } from 'src/app/admin-dashboard/services/company-data.service';
import { ClientDataService } from 'src/app/client-profile/services/client-data.service';
import { CompanyModel } from 'src/app/admin-dashboard/models/company.model';
import { ClientModel } from 'src/app/client-profile/models/client.model';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/client-dashboard/product.model';

@Component({
  selector: 'app-claim-view',
  templateUrl: './claim-view.component.html',
  styleUrls: ['./claim-view.component.css']
})
export class ClaimViewComponent {

  newDocument: ClaimDocument = {
    documentId: '',
    url: '',
    information: ''
  };

  claims: Claim[] = [];
  showUnapproved: boolean = false;
  panelOpenState = false;
  role = sessionStorage.getItem("role");
  Userid = sessionStorage.getItem("Userid");

  companies:CompanyModel[]=[];
  clients:ClientModel[]=[];

  products:Product[]=[]

  constructor(private claimservice:ClaimserviceService, public snackBar: MatSnackBar, public dialog:MatDialog,
              private companyService:CompanyDataService, private clientService:ClientDataService,
              private productService:ProductService){}

  ngOnInit(): void{
    
    // this.claimservice.getClaims().subscribe(
    //   data => {
    //     this.claims = data;
    //   }
    // )

    if(this.role != null && this.Userid != null){

      if(this.role === "client"){

        this.claimservice.getClaimsByCustomer(this.Userid).subscribe(
          data => {
            this.claims = data;
          }
        )

        this.companyService.getAllCompanies().subscribe(
          res=>this.companies=res
        )
  
      }else if(this.role === "company"){
  
        this.claimservice.getClaimsByCompany(this.Userid).subscribe(
          data => {
            this.claims = data;
          }
        )


      }

    }else{

      this.claimservice.getClaims().subscribe(
        data => {
          this.claims = data;
        }
      )
    }
    this.getAllProducts();

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  deleteDocument(claim: Claim, claimDoc: ClaimDocument) {
    
    this.claimservice.deleteClaimDocument(claim.claimId, claimDoc.documentId).subscribe(
      data=>{
        
        console.log(data);
          if (claim.documents) {
            claim.documents = claim.documents.filter(cd => cd.documentId !== claimDoc.documentId);
          }
          console.log('After:', claim.documents);    
      },

      err => console.log(err)
    )
    if (claim.documents) {
      claim.documents = claim.documents.filter(cd => cd.documentId !== claimDoc.documentId);
    }
    
  }

  approveClaim(claim:Claim): void{
    
    this.claimservice.approveClaim(claim.claimId, !claim.isApproved + "").subscribe(
      data=>{
        console.log(data);
        claim.isApproved = !claim.isApproved;
        
      },

      err => console.log(err)
    )
    
  }

  get filteredClaims(){
    if(this.showUnapproved){
      return this.claims.filter((claim) => claim.isApproved === false);
    }else{
      return this.claims;
    }
  }

  
  openAddDocumentDialog(claim: Claim, addDocumentDialog: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(addDocumentDialog, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newDocumentToAdd: ClaimDocument = {
          documentId: this.newDocument.documentId,
          url: this.newDocument.url,
          information: this.newDocument.information,
          date: new Date().toISOString().substring(0, 10)
        };
  
        this.claimservice.addDocument(claim.claimId, newDocumentToAdd).subscribe(
          data => {
  
          },
          err => console.log(err)
        );
        if (!claim.documents) {
          claim.documents = [];
        }
  
        claim.documents.push(newDocumentToAdd);
  
        this.newDocument = {
          documentId: '',
          url: '',
          information: ''
        };
      }
    });
  }
  
  getCompanyNameByCompanyId(companyId:string|undefined){
    return this.companies.filter(c=>(c.companyId+"")==companyId).map(c=>c.name)[0];
  }

  getAllProducts(){
    this.productService.getAllProducts()
      .subscribe(
        res=>this.products=res
      )
    
  }

  getProductNameByProductId(productId:string|undefined){
    return this.products.filter(p=>p.productId==productId).map(p=>p.name)[0];
  }
  
  
  


}
