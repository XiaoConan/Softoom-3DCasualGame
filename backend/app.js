import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./datasource.js";
import cors from "cors";

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

//user sign up
app.post("/users/signup", async (req, res) => {
  return "user sign up";
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
