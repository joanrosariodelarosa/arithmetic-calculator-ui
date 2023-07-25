import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {LoginResponse} from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class HttpClientRequest {

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(endpoint: string, requestBody: any): Observable<LoginResponse> {
    return this.handleRequest<LoginResponse>(endpoint, requestBody) as Observable<LoginResponse>;
  }

  public handleRequest<T>(endpoint: string, requestBody: any): Observable<T> {
    return this.http.post<T>(endpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          localStorage.removeItem('access_token');
          this.router.navigate(['/login']);
        }
        if(error.message != ""){
          window.alert(error.error?.errorMessage);
        }
        return throwError(error);
      })
    );
  }

}
