import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsercontrolService {

  isLoggedIn: boolean = false;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addCustomer(obj): Observable<any> {
    return this.http.post("http://localhost:3000/users/register", obj, this.httpOptions);
  }

  login(user: string, pass: string): Observable<any> {
    return this.http.post("users/login", { username: user, password: pass }, this.httpOptions);
  }

  logoutUser(): Observable<any> {
    return this.http.get("users/logout");
  }
}
