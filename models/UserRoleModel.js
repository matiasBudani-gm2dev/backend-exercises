import { DataTypes } from "sequelize";
import {sequelize} from "../boostrap.js";

import Users from "./UserModel.js";

const UserRole = sequelize.define("UserRole", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Users", 
      key: "userId"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "Roles",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  }
}, {
  tableName: "user_roles",
  timestamps: false
});

export async function createUserRoleModel(userRoleDTO){
    return {
        "userId" : userRoleDTO.user_id,
        "roleId" : userRoleDTO.role_id 
    }
}

export async function createPrimaryKeysUserRole(userRoleDTO){
    return {
        "userId" : userRoleDTO.user_id,
        "roleId" : userRoleDTO.role_id
    }
}

export async function updateUserRolesModel(userRolesDTO){
    return {
        "userId" : userRolesDTO.user_id,
        "rolesIds" : userRolesDTO.roles_ids
    }
}

export default UserRole