import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private routeobj : Router) { }
  openHome()
  {
    this.routeobj.navigate(['home'])
  }
  openLogin()
  {
    this.routeobj.navigate(['login'])
  }
  openMyProducts()
  {
    this.routeobj.navigate(['my-products'])
  }
  openMyPlans()
  {
    this.routeobj.navigate(['my-plans'])
  }
  openMyBundles()
  {
    this.routeobj.navigate(['my-bundles'])
  }
  openAddClaim()
  {
    this.routeobj.navigate(['create-claim'])
  }
}