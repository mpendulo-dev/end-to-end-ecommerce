import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  REGISTRATION_URL = 'http://localhost:3001/register';
  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.REGISTRATION_URL, userData);
  }

}
