import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./datasource.js";
import cors from "cors";
import { foodRouter } from "./routers/food_router.js";
import { usersRouter } from "./routers/users_router.js";
import cookieParser from "cookie-parser";

const PORT = 3000;

export const app = express();
app.use(bodyParser.json());

app.use(cookieParser());

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use("/food", foodRouter);
app.use("/users", usersRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://j.softoom.space", PORT);
});
