import { sequelize } from '../datasource.js';
import { DataTypes } from 'sequelize';

export const Users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});