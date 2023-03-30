import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

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

  paymentHandler: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.invokeStripe();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Mr6f4GoTMrFoklNTppHZFZAVC5UqG6cNYWQ2E29RV7jFust3VL2j2oLgreaRp9gOvy8KlYnZXYGuL5U9Tzp62iJ00F1jDDt8M',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

  //checkout
  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Mr6f4GoTMrFoklNTppHZFZAVC5UqG6cNYWQ2E29RV7jFust3VL2j2oLgreaRp9gOvy8KlYnZXYGuL5U9Tzp62iJ00F1jDDt8M',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);

        // //send the array of all food quantities to the backend
        // let foodQuantities = [
        //   this.foodOne,
        //   this.foodTwo,
        //   this.foodThree,
        //   this.foodFour,
        //   this.foodFive,
        // ];

        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (token: any) => {
      this.api.makePayment(this.totalPrice, token).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    paymentHandler.open({
      name: 'Softoom',
      description: 'Softoom Food Order',
      amount: this.totalPrice * 100,
    });
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
