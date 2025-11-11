import { DataTypes } from "sequelize";
import { sequelize } from "../boostrap.js";

const Players = sequelize.define(
  "Players",
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    nick: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    position: {
      type: DataTypes.ENUM("forward", "midfielder", "defender", "goalkeeper"),
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "players",
    timestamps: false,
  },
);

export default Players;
