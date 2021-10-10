import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthuserGuard implements CanActivate {
  
  constructor(private loginService: LoginServiceService, private router: Router) {   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
       if(this.loginService.tokenValidation(this.loginService.getToken())) {
        return true;
       }
        return this.router.parseUrl('/login');
  }  
}
