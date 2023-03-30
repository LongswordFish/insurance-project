import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router:Router,private jwthelper:JwtHelperService){
  }

     /*  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true; */

  canActivate(){

    const token=localStorage.getItem("token");
    if(token && !this.jwthelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(['login']);
    return false;

  }
  
}
