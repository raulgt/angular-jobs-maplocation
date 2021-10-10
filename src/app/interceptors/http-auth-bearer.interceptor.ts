import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LoginServiceService } from '../services/login-service.service';
import { catchError } from 'rxjs/operators';
import { methodsWithBearer } from '../configurations/constants';

@Injectable()
export class HttpAuthBearerInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken();

    // Simple way to include the Bearer token for allowed methods
    if (this.loginService.tokenValidation(token) && methodsWithBearer.includes(request.url.split('api/')[1])) { 
      const customRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });

      return next.handle(customRequest).pipe(
        catchError((error, caught) => {
          console.log('Error Occurred');
          console.log(error);
          // return the error to the method that called it
          return of(error);
        }) as any
      );
    }

    return next.handle(request);
  }
}
