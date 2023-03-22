import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./datasource.js";
import cors from "cors";
import { foodRouter } from "./routers/food_router.js";
import { usersRouter } from "./routers/users_router.js";

const PORT = 3000;
export const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:4200",
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
  else console.log("HTTP server on http://localhost:%s", PORT);
});
