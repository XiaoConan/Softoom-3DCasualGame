import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //user sign up
  signUp(data) {
    return this.http.post(`${this.endpoint}/users/signup`, data);
  }

  //user sign in
  signIn(data) {
    return this.http.post(`${this.endpoint}/users/signin`, data);
  }
}
