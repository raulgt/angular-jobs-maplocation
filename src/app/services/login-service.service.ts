import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserLoginDtoOutput } from 'src/interfaces/user-authentication/UserLoginDtoOutput';
import { UserLoginDtoInput } from 'src/interfaces/user-authentication/UserLoginDtoInput';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserAuthInfoDtoOutput } from 'src/interfaces/user-authentication/UserAuthInfoDtoOutput';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private ls: LocalStorageService
  ) {}

  loginUser(credentials: UserLoginDtoInput): Observable<UserLoginDtoOutput> {
    return this.http
      .post<UserLoginDtoOutput>(`${base_url}/auth/login`, credentials, {})
      .pipe(
        map((res: UserLoginDtoOutput) => {
          if(res.access_token){
           this.saveLoginToken(res.access_token);
          }       
          return res;
        }),
        catchError(this.handleError<any>('loginUser'))
      );
  }

  userDetail(): Observable<UserAuthInfoDtoOutput> {   
    return this.http.get<UserAuthInfoDtoOutput>(`${base_url}/auth/me`, {})
    .pipe(
      map((res: UserAuthInfoDtoOutput) => {    
        return res;
      }),
      catchError(this.handleError<any>('userDetail'))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  getToken(): object | null  {
    return this.ls.getItem('token');
  }

  tokenValidation(token: object | null ): boolean {         
     if (token && !this.tokenExpired(token.toString())) {      
      return true;
     }
     return false;
  }

  private tokenExpired(token: string) {    
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  private saveLoginToken(token: string){
    this.ls.setItem('token', token);
  }

  private handleError<T>(operation = 'operation', result?: T) {      
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
