import { Router } from "express";
import { Users } from "../models/users.js";

export const usersRouter = Router();

//user sign up
usersRouter.post("/signup", async (req, res) => {
  const user = Users.build({
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    roomType: req.body.roomType,
    hungerValue: 100,
  });
  try {
    await user.save();
  } catch (error) {
    return res.status(422).json({ error: "User creation failed." });
  }
  return res.json({ message: "User created successfully." });
});

//user login
usersRouter.post("/signin", async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    return res.status(401).json({ error: "User not registered" });
  }
  if (user.password !== req.body.password) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }
  console.log(user);
  return res.json(user);
});

//get user info
usersRouter.get("/find/:username", async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  return res.json(user);
});

//update user info
usersRouter.patch("/update/:username/:value", async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  try {
    user.hungerValue = req.params.value;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "User update failed." });
  }
});

