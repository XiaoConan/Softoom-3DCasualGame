import { Router } from "express";
import { Users } from "../models/users.js";
import bcrypt from "bcrypt";

export const usersRouter = Router();

//user sign up
usersRouter.post("/signup", async (req, res) => {
  const user = Users.build({
    username: req.body.username,
    gender: req.body.gender,
    roomType: req.body.roomType,
    hungerValue: 100,
  });
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);
  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: "User creation failed." });
  }
  return res.json({ user });
});

//user login
usersRouter.post("/signin", async (req, res) => {
  const user = await Users.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user == null) {
    return res.status(401).json({ error: "User not registered" });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ error: "Incorrect username or password." });
  }
  return res.json({ user });
});

//get user info
usersRouter.get("/me", async (req, res) => {
  if (!req.cookies.username) {
    return res.status(401).json({ error: "You are not authenticated." });
  }

  const user = await Users.findOne({
    where: {
      username: req.cookies.username,
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
    console.log(user);
    return res.json(user);
  } catch (error) {
    return res.status(422).json({ error: "User update failed." });
  }
});

//user logout
usersRouter.get("/logout", async (req, res) => {
  //clear cookie
  res.clearCookie("username");
  return res.json({ message: "User logged out successfully." });
});
