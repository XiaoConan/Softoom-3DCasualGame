import { Component } from '@angular/core';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss', 'food-menu-cols.scss'],
})
export class FoodMenuComponent {
  foodOne: number = 0;
  foodTwo: number = 0;
  foodThree: number = 0;
  foodFour: number = 0;
  foodFive: number = 0;
  totalPrice: number = 0;
  formattedTotalPrice: string = this.totalPrice.toFixed(2);

  constructor() { }

  ngOnInit(): void {
  }

  //increase food quantity
  increaseFoodOne() {
    this.foodOne++;
    this.getTotalPrice();
  }

  increaseFoodTwo() {
    this.foodTwo++;
    this.getTotalPrice();
  }

  increaseFoodThree() {
    this.foodThree++;
    this.getTotalPrice();
  }

  increaseFoodFour() {
    this.foodFour++;
    this.getTotalPrice();
  }

  increaseFoodFive() {
    this.foodFive++;
    this.getTotalPrice();
  }

  //decrease food quantity
  decreaseFoodOne() {
    if (this.foodOne > 0) {
      this.foodOne--;
      this.getTotalPrice();
    }
  }

  decreaseFoodTwo() {
    if (this.foodTwo > 0) {
      this.foodTwo--;
      this.getTotalPrice();
    }
  }

  decreaseFoodThree() {
    if (this.foodThree > 0) {
      this.foodThree--;
      this.getTotalPrice();
    }
  }

  decreaseFoodFour() {
    if (this.foodFour > 0) {
      this.foodFour--;
      this.getTotalPrice();
    }
  }

  decreaseFoodFive() {
    if (this.foodFive > 0) {
      this.foodFive--;
      this.getTotalPrice();
    }
  }

  //get total price
  getTotalPrice() {
    this.totalPrice =
      this.foodOne * 3.99 +
      this.foodTwo * 3.99 +
      this.foodThree * 1.99 +
      this.foodFour * 7.99 +
      this.foodFive * 5.99;
    this.formattedTotalPrice = this.totalPrice.toFixed(2);
  }

  //reset food quantity
  reset() {
    this.foodOne = 0;
    this.foodTwo = 0;
    this.foodThree = 0;
    this.foodFour = 0;
    this.foodFive = 0;
    this.getTotalPrice();
  }

}
