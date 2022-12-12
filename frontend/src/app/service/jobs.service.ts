import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  // Add
  
  AddJob(jobDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/jobs';
    return this.httpClient.post(API_URL, jobDetails).pipe();
  }
  
  UserLogin(loginDetails:any): Observable<any> {
    let API_URL = environment.REST_API + '/users/login';
    return this.httpClient.post(API_URL, loginDetails)
  }
  
  GetUserByEmail(email:any): Observable<any> {
    let API_URL = environment.REST_API+ '/profile/usersByEmail';
    return this.httpClient.get(API_URL, email)
  }
  
  GetAllJobs(): Observable<any>  {
    return this.httpClient.get(environment.REST_API + '/jobs');
  }
  
  updateProfile(id: any, data: any): Observable<any> {
    let API_URL = environment.REST_API + '/users/'+id;
    return this.httpClient.patch(API_URL, data).pipe();
  }
  
  updateUser(id: any, data: any): Observable<any> {
    return this.httpClient.patch(`${environment.REST_API}/users/${id}`, data);
  }
  
  }