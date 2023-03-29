import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //user sign up
  signUp(
    username: String,
    password: String,
    gender: String,
    roomType: String
  ): Observable<any> {
    return this.http.post(`${this.endpoint}/users/signup`, {
      username,
      password,
      gender,
      roomType,
    });
  }

  //user sign in
  signIn(username: String, password: String): Observable<any> {
    return this.http.post(`${this.endpoint}/users/signin`, {
      username,
      password,
    });
  }

  //make payment
  makePayment(stripeToken: any): Observable<any> {
    return this.http.post(`${this.endpoint}/food/order`, {
      token: stripeToken,
    });
  }
}
