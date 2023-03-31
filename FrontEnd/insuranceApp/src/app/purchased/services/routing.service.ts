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
  openMyPlans()
  {

    this.routeobj.navigate(['my-plans'])
  }
}
