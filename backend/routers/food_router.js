import { Router } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe('sk_test_51Mr6f4GoTMrFoklNklJ4mEmG2mtYbtNEuJAxm7zAw2KF1yeW0mTGfz8DOmsbqQ7fJmr0vobdb2GEMS0ldz5RSNs500xFehDdUB'); 

export const foodRouter = Router();

//food order
foodRouter.post("/order", async (req, res) => {
  try {
    const token = req.body.token;
    const amount = req.body.amount;
    
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const charge = await stripe.charges.create({
      amount: amount * 100,
      description: "Softoom Food Order",
      currency: "CAD",
      customer: customer.id,
    });

    console.log(charge);
    res.json({
      data: "success"
    });
  } catch (error) {
    console.log(error);
    res.json({
      data: "failure",
    });
  }
});

