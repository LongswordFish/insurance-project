import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingService } from '../purchased/services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private routingService:RoutingService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let role = sessionStorage.getItem("role");
      if(role==undefined){
        this.routingService.openHome();
        return false;

      }
      if(role.toLocaleLowerCase()=='client'){
        return true;
      }
      this.routingService.openHome();
      return false;
  }
  
}
