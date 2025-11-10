import { DataTypes } from "sequelize";
import {sequelize} from "../boostrap.js";

const Players = sequelize.define("Players", {
  player_id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
  },
  nick : {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  position: {
    type: DataTypes.ENUM('forward', 'midfielder', 'defender', 'goalkeeper'),
    allowNull: false
  },
  number : {
    type: DataTypes.NUMBER
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "players",
  timestamps: false
})