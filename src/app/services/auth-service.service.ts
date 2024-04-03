import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _URL_AUTHUSER, _URL_DELETE_USER, _URL_GET_USER, _URL_GET_USERBYNORMAL, _URL_LOGS, _URL_POST_NEWUSER, _URL_UPDATE_USER } from '../config/config';
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
  public deleteUser(data:Object):Observable<Object>{
    return this.http.delete(_URL_DELETE_USER,{body:data})
  }
  public newLog(data:Object):Observable<Object>{
    return this.http.post(_URL_LOGS,data)
  }
  public updateUser(data:Object):Observable<Object>{
    return this.http.put(_URL_UPDATE_USER,data)
  }
}
