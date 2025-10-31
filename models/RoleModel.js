
import { DataTypes } from "sequelize";
import {sequelize} from "../boostrap.js";

const Roles = sequelize.define("Roles", {
  roleId: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  tableName: "roles",
  timestamps: false
})


export async function createOrUpdateRole(roleDTO){
    return {
        "roleName" : roleDTO.role_name
    }
}

export default Roles