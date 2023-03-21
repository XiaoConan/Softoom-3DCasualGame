// datasource.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("appData", "postgres", "H1092387456M", {
  host: "localhost",
  port: 5433,
  dialect: "postgres",
});
