import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Login} from "../../models/login.model";
import {Registration} from "../../models/registration.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LOGIN_URL =  'http://localhost:3000/api/users/login';
  constructor(private http: HttpClient) { }

  userLogin(userCredentials: Login[]): Observable<Login[]> {
    return this.http.post<Login[]>(this.LOGIN_URL, userCredentials);
  }
}
