import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bundle } from '../app/bundle';

@Injectable({
  providedIn: 'root',
})
export class BundleService {
  private baseURL = 'http://localhost:9095/bundles';

  constructor(private http: HttpClient) {}

  getAllBundles(): Observable<Bundle[]> {
    return this.http.get<Bundle[]>(`${this.baseURL}`);
  }

  getBundleById(id: string): Observable<Bundle> {
    return this.http.get<Bundle>(`${this.baseURL}/view/${id}`);
  }

  viewBundleByCompanyId(companyId: string, id: string): Observable<Bundle> {
    return this.http.get<Bundle>(`${this.baseURL}/${companyId}/${id}`);
  }

  createBundle(bundle: Bundle): Observable<Bundle> {
    return this.http.post<Bundle>(`${this.baseURL}/create`, bundle);
  }

  updateBundle(id: string, bundle: Bundle): Observable<Bundle> {
    return this.http.put<Bundle>(`${this.baseURL}/update/${id}`, bundle);
  }

  deleteBundle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/delete/${id}`);
  }
}
