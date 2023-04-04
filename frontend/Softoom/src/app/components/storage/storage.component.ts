import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss', './storage-cols.scss'],
})
export class StorageComponent {

  foodOne: number = 0;
  foodTwo: number = 0;
  foodThree: number = 0;
  foodFour: number = 0;
  foodFive: number = 0;

  constructor(private api: ApiService, private cookieService: CookieService) {}

  ngOnInit(): void {
    //clear the fridge
    const username = this.cookieService.get('username');
    this.api.getFood(username).subscribe(
      (data) => {
        console.log(data);
        this.foodOne = data.foodOne;
        this.foodTwo = data.foodTwo;
        this.foodThree = data.foodThree;
        this.foodFour = data.foodFour;
        this.foodFive = data.foodFive;
      }
    );
  }

  //eat the food
  eatFoodOne() {
    if (this.foodOne > 0) {
      this.foodOne--;
      const username = this.cookieService.get('username');
      this.api.deleteFood("Baking Bread", username).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eatFoodTwo() {
    if (this.foodTwo > 0) {
      this.foodTwo--;
      const username = this.cookieService.get('username');
      this.api.deleteFood("Grilled Sausage", username).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eatFoodThree() {
    if (this.foodThree > 0) {
      this.foodThree--;
      const username = this.cookieService.get('username');
      this.api.deleteFood("Coke", username).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eatFoodFour() {
    if (this.foodFour > 0) {
      this.foodFour--;
      const username = this.cookieService.get('username');
      this.api.deleteFood("Pizza", username).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  eatFoodFive() {
    if (this.foodFive > 0) {
      this.foodFive--;
      const username = this.cookieService.get('username');
      this.api.deleteFood("Hamburger", username).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
