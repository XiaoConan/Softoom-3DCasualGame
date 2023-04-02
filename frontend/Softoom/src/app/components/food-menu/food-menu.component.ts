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

        paymentStripe(stripeToken);
      },
    });

    const paymentStripe = (token: any) => {
      this.api.makePayment(this.totalPrice, token).subscribe(
        (data) => {
          const status = document.getElementById('status');
          status!.innerHTML = data.data;
          status!.classList.add('fade-out');
          setTimeout(() => {
            status!.innerHTML = '';
            status!.classList.remove('fade-out');
          }, 5000);

          //store the food in the database
          if (this.foodOne > 0) {
            for (let i = 0; i < this.foodOne; i++) {
              this.api.storeFood("Baking Bread", 3, token.email).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          }
          if (this.foodTwo > 0) {
            for (let i = 0; i < this.foodTwo; i++) {
              this.api.storeFood("Grilled Sausage", 3, token.email).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          }
          if (this.foodThree > 0) {
            for (let i = 0; i < this.foodThree; i++) {
              this.api.storeFood("Coke", 1, token.email).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          }
          if (this.foodFour > 0) {
            for (let i = 0; i < this.foodFour; i++) {
              this.api.storeFood("Pizza", 7, token.email).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          }
          if (this.foodFive > 0) {
            for (let i = 0; i < this.foodFive; i++) {
              this.api.storeFood("Hamburger", 5, token.email).subscribe(
                (data) => {
                  console.log(data);
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          }
          this.reset();
        },
        (error) => {
          const status = document.getElementById('status');
          status!.innerHTML = error.error;
          status!.classList.add('fade-out');
          setTimeout(() => {
            status!.innerHTML = '';
            status!.classList.remove('fade-out');
          }, 5000);
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
      this.foodOne * 3 +
      this.foodTwo * 3 +
      this.foodThree * 1 +
      this.foodFour * 7 +
      this.foodFive * 5;
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
