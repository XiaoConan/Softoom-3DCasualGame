// datasource.js
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("appData", "postgres", "H1092387456M", {
  host: "db",
  port: 5432,
  dialect: "postgres",
});
