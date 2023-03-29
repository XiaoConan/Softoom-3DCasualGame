import { Router } from "express";
import { Stripe } from "stripe";

const stripe = new Stripe('sk_test_51Mr6f4GoTMrFoklNklJ4mEmG2mtYbtNEuJAxm7zAw2KF1yeW0mTGfz8DOmsbqQ7fJmr0vobdb2GEMS0ldz5RSNs500xFehDdUB'); 

export const foodRouter = Router();

//food order
foodRouter.post("/order", async (req, res) => {
//   const order = Food.build({
//     username: req.body.username,
//     food: req.body.food,
//     quantity: req.body.quantity,
//     price: req.body.price,
//   });
//   try {
//     await order.save();
//   } catch (error) {
//     return res.status(422).json({ error: "Order creation failed." });
//   }
  return res.json({ message: "Order created successfully." });
});
