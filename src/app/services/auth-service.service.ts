import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _URL_AUTHUSER, _URL_GET_USER, _URL_GET_USERBYNORMAL, _URL_POST_NEWUSER } from '../config/config';
import { Observable } from 'rxjs';
import { _URL_AUTH } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  public authPost(data:Object):Observable<Object>{
    return this.http.post(_URL_AUTHUSER,data);
  }
  public getUser(id:any):Observable<any>{
    return this.http.get(_URL_GET_USER+id);
  }
  public getRoleUsers(role:any):Observable<any>{
    return this.http.get(_URL_GET_USERBYNORMAL+role);
  }
  public postNewUser(data:Object):Observable<object>{
    return this.http.post(_URL_POST_NEWUSER,data)
  }
}
