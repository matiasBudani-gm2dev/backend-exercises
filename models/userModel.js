
import { DataTypes } from "sequelize";
import {sequelize} from "../boostrap.js";

import UserRole from "./UserRoleModel.js";

const Users = sequelize.define("Users", {
  userId: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }
}, {
  tableName: "users",
  timestamps: false
})

export function validatePassword(password){
    if(password.length < 6){
        return false
    }
    return true
}

export async function createUser(userDTO){
    return {
        "userName" : userDTO.user_name,
        "email": userDTO.email,
        "password": userDTO.passwordHash,
    }
}

export async function updateUser(userDTO){
    return{
        "userName" : userDTO.user_name,
        "email" : userDTO.email,
    }
}

export function getUserWithoutPassword(user){
    if(!user) return null
    const {password, ...userWithoutPassword } = user
    return userWithoutPassword
}

export default Users