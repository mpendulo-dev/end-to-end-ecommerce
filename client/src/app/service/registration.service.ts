import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Registration} from "../models/registration.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  REGISTRATION_URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  registerUser(userData: Registration[]): Observable<Registration[]> {
    return this.http.post<Registration[]>(`${this.REGISTRATION_URL}/register`, userData);
  }

}
