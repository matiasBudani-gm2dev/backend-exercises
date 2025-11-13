import { sequelize } from "../boostrap.js";
import { DataTypes } from "sequelize";

const Teams = sequelize.define(
  "Teams",
  {
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    team_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: false,
  },
);

export default Teams;
