import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { JobsDtoOut } from 'src/interfaces/Jobs/JobsDtoOut';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class JobLocationService {
  constructor(private http: HttpClient, private router: Router) {}

  getJobs(): Observable<JobsDtoOut> {
    return this.http.get<JobsDtoOut>(`${base_url}/jobs`).pipe(
      map((res: JobsDtoOut) => {
        return res;
      }),
      catchError(this.handleError<any>('getJobs'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
