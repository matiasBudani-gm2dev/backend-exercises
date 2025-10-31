import { pool} from "../boostrap.js"
import { findByField, save, updateById, deleteById } from "./BaseRepository.js"

import baseRepository from "./BaseRepository.js"
import Users from "../models/UserModel.js"

const usersTable = {
    tableName : "users",
    tablePK: "userId"
}

export async function findAllUsers(){
    return baseRepository.findAll(Users)
}

export async function findUserById(id){
    return baseRepository.findByPk(Users, id)
}

export async function findByEmail(email){
    const [rows] = await pool.query(`
        SELECT * from users
        WHERE email = ?`, [email])
    return rows[0]
}

export async function saveUser(user){
   return save(user, usersTable.tableName)
}

export async function updateUserById(id, newUserData){
    updateById(id, newUserData, usersTable.tableName, usersTable.tablePK)
}

export async function deleteUserById(id){
   deleteById(id, usersTable.tableName, usersTable.tablePK)
}