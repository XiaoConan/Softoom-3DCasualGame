import { Router } from "express";
import { Stripe } from "stripe";
import { Food } from "../models/food.js";
import { Users } from "../models/users.js";

const stripe = new Stripe(
  "sk_test_51Mr6f4GoTMrFoklNklJ4mEmG2mtYbtNEuJAxm7zAw2KF1yeW0mTGfz8DOmsbqQ7fJmr0vobdb2GEMS0ldz5RSNs500xFehDdUB"
);

export const foodRouter = Router();

//food order
foodRouter.post("/order", async (req, res) => {
  try {
    const token = req.body.token;
    const amount = req.body.amount;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      //convert amount to dollar
      amount: Math.round(amount * 100),
      description: "Softoom Food Order",
      currency: "CAD",
      customer: customer.id,
    });

    return res.json({
      data: "Payment Successful!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Payment Failed!",
    });
  }
});

//food storage
foodRouter.post("/storage", async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const food = Food.build({
    foodName: req.body.foodName,
    price: req.body.price,
    email: req.body.email,
    userId: user.id,
  });
  try {
    await food.save();
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Food creation failed." });
  }
  return res.json({ message: "Food created successfully." });
  
});

//get all food in the user's fridge
foodRouter.get("/fridge/:email", async (req, res) => {
  const foodOne = await Food.count({
    where: {
      email: req.params.email,
      foodName: "Baking Bread",
    },
  });
  const foodTwo = await Food.count({
    where: {
      email: req.params.email,
      foodName: "Grilled Sausage",
    },
  });
  const foodThree = await Food.count({
    where: {
      email: req.params.email,
      foodName: "Coke",
    },
  });
  const foodFour = await Food.count({
    where: {
      email: req.params.email,
      foodName: "Pizza",
    },
  });
  const foodFive = await Food.count({
    where: {
      email: req.params.email,
      foodName: "Hamberger",
    },
  });

  return res.json({foodOne, foodTwo, foodThree, foodFour, foodFive});
});

//delete food from the user's fridge
foodRouter.delete("/fridge/:foodName/:email", async (req, res) => {
  const food = await Food.findOne({
    where: {
      email: req.params.email,
      foodName: req.params.foodName,
    },
  });
  if (!food) {
    return res.status(404).json({ error: "No food of this type." });
  }
  try {
    await food.destroy();
    const user = await Users.findOne({
      where: {
        email: req.params.email,
      },
    });
    if (req.params.foodName === "Baking Bread" || req.params.foodName === "Grilled Sausage") {
      if (user.hungerValue + 30 >= 100) {
        user.hungerValue = 100;
      } else {
        user.hungerValue += 30;
      }
    } else if (req.params.foodName === "Coke") {
      if (user.hungerValue + 10 >= 100) {
        user.hungerValue = 100;
      } else {
        user.hungerValue += 10;
      }
    } else if (req.params.foodName === "Pizza") {
      if (user.hungerValue + 70 >= 100) {
        user.hungerValue = 100;
      } else {
        user.hungerValue += 70;
      }
    } else if (req.params.foodName === "Hamberger") {
      if (user.hungerValue + 50 >= 100) {
        user.hungerValue = 100;
      } else {
        user.hungerValue += 50;
      }
    }
    await user.save();
    return res.json({ message: "Food deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "Food deletion failed." });
  }
});

