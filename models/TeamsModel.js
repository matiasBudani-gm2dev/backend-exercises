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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "matches_teams",
    timestamps: false,
  },
);

export default Teams;
