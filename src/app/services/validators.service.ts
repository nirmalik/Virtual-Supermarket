import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {

  }

  checkIDExists(id): Observable<any> {
    return this.http.post("http://localhost:3000/users/checkID", { id: id }, this.httpOptions);
  }
  checkEmailExists(email): Observable<any> {
    return this.http.post("http://localhost:3000/users/checkEmail", { email: email }, this.httpOptions);
  }
}
