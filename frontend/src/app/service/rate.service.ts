import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  // Add

  GetAllRating(): Observable<any>  {
    return this.httpClient.get(environment.REST_API + '/rate');
  }

  GetNumRating(): Observable<any>  {
    return this.httpClient.get(environment.REST_API + '/numRate');
  }

}
