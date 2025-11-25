import { sequelize } from "../boostrap.js";
import { DataTypes } from "sequelize";

const TeamsPlayers = sequelize.define(
  "TeamsPlayers",
  {
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Teams",
        key: "team_id",
      },
    },
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Players",
        key: "player_id",
      },
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assists: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  { tableName: "teams_players", timestamps: false },
);

export default TeamsPlayers;
