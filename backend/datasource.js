// datasource.js
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', 'H1092387456M', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});