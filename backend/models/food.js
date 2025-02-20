import { sequelize } from "../datasource.js";
import { DataTypes } from "sequelize";
import { Users } from "./users.js";

export const Food = sequelize.define("food", {
  foodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Food.belongsTo(Users);
Users.hasMany(Food);
