import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint = 'https://api.j.softoom.space';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

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
  makePayment(amount: number, token: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/food/order`, {
      amount,
      token,
    });
  }

  //store food
  storeFood(foodName: String, price: number, email: String): Observable<any> {
    return this.http.post(`${this.endpoint}/food/storage`, {
      foodName,
      price,
      email,
    });
  }

  //get all food in the user's fridge
  getFood(email: String): Observable<any> {
    return this.http.get(`${this.endpoint}/food/fridge/${email}`);
  }

  //delete food from fridge
  deleteFood(foodName: String, email: String): Observable<any> {
    return this.http.delete(
      `${this.endpoint}/food/fridge/${foodName}/${email}`
    );
  }

  //get user info from email
  getUser(): Observable<any> {
    const cookie = this.cookieService.get('username');
    return this.http.get(`${this.endpoint}/users/me/${cookie}`, {
      withCredentials: true,
    });
  }

  //update user info
  updateHungryValue(email: String, hungerValue: number): Observable<any> {
    return this.http.patch(
      `${this.endpoint}/users/update/${email}/${hungerValue}`,
      {}
    );
  }

  //signout
  signOut(): Observable<any> {
    return this.http.get(`${this.endpoint}/users/logout`, {
      withCredentials: true,
    });
  }
}
