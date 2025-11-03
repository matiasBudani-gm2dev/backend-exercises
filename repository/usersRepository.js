import {save, updateById, deleteById } from "./BaseRepository.js"

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
    return baseRepository.findOne(Users, email)
}

export async function saveUser(user){
   return baseRepository.create(Users, user)
}

export async function updateUserById(id, newUserData){
    updateById(id, newUserData, usersTable.tableName, usersTable.tablePK)
}

export async function deleteUserById(id){
   deleteById(id, usersTable.tableName, usersTable.tablePK)
}