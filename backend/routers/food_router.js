import { Router } from "express";
import { Stripe } from "stripe";
import { Food } from "../models/food.js";

const stripe = new Stripe(
  "sk_test_51Mr6f4GoTMrFoklNklJ4mEmG2mtYbtNEuJAxm7zAw2KF1yeW0mTGfz8DOmsbqQ7fJmr0vobdb2GEMS0ldz5RSNs500xFehDdUB"
);

export const foodRouter = Router();

//food order
foodRouter.post("/order", async (req, res) => {
  try {
    const token = req.body.token;
    const amount = req.body.amount;
    const foodQuantities = req.body.foodQuantities;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: amount * 100,
      description: "Softoom Food Order",
      currency: "CAD",
      customer: customer.id,
    });

    // for (let i = 0; i < foodQuantities.length; i++) {
    //   if (foodQuantities[i].quantity > 0) {
    //     console.log(foodQuantities[i].quantity);
    //     if (i === 0) {
    //       for (let j = 0; j < foodQuantities[i].quantity; j++) {
    //         const food = Food.build({
    //           foodName: "Baking Bread",
    //           price: 3.99,
    //           email: token.email,
    //           userId: 1,
    //         });
    //         try {
    //           await food.save();
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //     } else if (i === 1) {
    //       for (let j = 0; j < foodQuantities[i].quantity; j++) {
    //         const food = Food.build({
    //           foodName: "Grilled Sausage",
    //           price: 3.99,
    //           email: token.email,
    //           userId: 1,
    //         });
    //         try {
    //           await food.save();
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //     } else if (i === 2) {
    //       for (let j = 0; j < foodQuantities[i].quantity; j++) {
    //         const food = Food.build({
    //           foodName: "Coke",
    //           price: 1.99,
    //           email: token.email,
    //           userId: 1,
    //         });
    //         try {
    //           await food.save();
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //     } else if (i === 3) {
    //       for (let j = 0; j < foodQuantities[i].quantity; j++) {
    //         const food = Food.build({
    //           foodName: "Pizza",
    //           price: 7.99,
    //           email: token.email,
    //           userId: 1,
    //         });
    //         try {
    //           await food.save();
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //     } else {
    //       for (let j = 0; j < foodQuantities[i].quantity; j++) {
    //         const food = Food.build({
    //           foodName: "Baking Donuts",
    //           price: 5.99,
    //           email: token.email,
    //           userId: 1,
    //         });
    //         try {
    //           await food.save();
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //     }
    //   }
    // }

    res.json({
      data: "Payment Successful!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "Payment Failed!",
    });
  }
});
