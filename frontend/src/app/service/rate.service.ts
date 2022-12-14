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

  AddRate(rateDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/rate';
    return this.httpClient.post(API_URL, rateDetails).pipe();
  }

  GetNumRating(): Observable<any>  {
    return this.httpClient.get(environment.REST_API + '/numRate');
  }

  GetRateByRater(): Observable<any>  {
    return this.httpClient.get(environment.REST_API + '/rateByRater');
  }

  GetRateByReted(): Observable<any>  {
    return this.httpClient.get(environment.REST_API + '/rateByRated');
  }

}
