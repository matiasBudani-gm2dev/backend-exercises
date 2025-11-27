import { DataTypes } from "sequelize";
import { sequelize } from "../boostrap.js";

const VerificationCodes = sequelize.define(
  "VerificationCodes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "verification_codes",
    timestamps: false,
  },
);

export default VerificationCodes;
