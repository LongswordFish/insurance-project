import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from './Model/Claim';
import { ClaimDocument } from './Model/ClaimDocument';
// import { ClaimDocument} from './Model/ClaimDocument';

@Injectable({
  providedIn: 'root'
})
export class ClaimserviceService {

  private url = 'http://localhost:9096/claim/'
  
  token = sessionStorage.getItem("token");

  
  constructor(private http: HttpClient) { }

  getClaims():Observable<any>{

    return this.http.get<Array<Claim>>(this.url+'view', {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
    });
  }

  getClaimsByCustomer(customerId:string):Observable<any>{

    return this.http.get<Array<Claim>>(this.url+'view/customer/' + customerId , {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
    });
  }

  getClaimsByCompany(companyId:string):Observable<any>{

    return this.http.get<Array<Claim>>(this.url+'view/company/' + companyId, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
    });
  }


  getClaim(id:string):Observable<any>{

    return this.http.get<Claim>(this.url+'view/' + id, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
    });
  }

  approveClaim(claimId:string | undefined, doApprove:string):Observable<any>{
    
    return this.http.post(this.url + "approve/" + claimId + "/" + doApprove, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
    });
  }
 
  deleteClaimDocument(claimId:string | undefined, claimDocumentId:string | undefined):Observable<any>{

    return this.http.delete(this.url + "document/delete/" + claimId + "/" + claimDocumentId, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
    });
  }

  addClaim(claim:Claim):Observable<any>{

  const authHeader = new HttpHeaders({'Authorization': 'Bearer ' + this.token});

  const contentTypeHeader = new HttpHeaders({'Content-Type': 'application/json'});

  const headers = authHeader.append('Content-Type', 'application/json');

    return this.http.post<Claim>(this.url + 'add', claim,{
      headers
    });
  }

  addDocument(claimId:string| undefined, doc:ClaimDocument):Observable<any>{

    const authHeader = new HttpHeaders({'Authorization': 'Bearer ' + this.token});
  
    const contentTypeHeader = new HttpHeaders({'Content-Type': 'application/json'});
  
    const headers = authHeader.append('Content-Type', 'application/json');
  
      return this.http.post<Claim>(this.url + 'document/add/' + claimId, doc,{
        headers
      });
    }

}
