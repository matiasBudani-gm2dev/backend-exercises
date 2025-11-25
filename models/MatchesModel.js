import { DataTypes } from "sequelize";
import { sequelize } from "../boostrap.js";

const Matches = sequelize.define(
  "Matches",
  {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    playerPerTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    match_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    home_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    away_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("finished", "in progress", "pending", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
    home_team_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    away_team_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "matches",
    timestamps: false,
  },
);

export default Matches;
