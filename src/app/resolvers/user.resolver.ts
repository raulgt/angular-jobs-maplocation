import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthInfoDtoOutput } from 'src/interfaces/user-authentication/UserAuthInfoDtoOutput';
import { routeUserResolver } from '../configurations/constants';
import { LoginServiceService } from '../services/login-service.service';


@Injectable()
export class UserResolver implements Resolve<UserAuthInfoDtoOutput> {
 
    emptyUser : UserAuthInfoDtoOutput = {
        id: 0,
        name: '',
        email: '',
        email_verified_at: '',
        created_at: '',
        updated_at: ''
    }

  constructor(private loginService: LoginServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | UserAuthInfoDtoOutput
    | Observable<UserAuthInfoDtoOutput>
    | Promise<UserAuthInfoDtoOutput> {        
     
    if(route.routeConfig?.path === routeUserResolver){     
        return this.loginService.userDetail(); 
    }
    
    return this.emptyUser;
  }
  
}
