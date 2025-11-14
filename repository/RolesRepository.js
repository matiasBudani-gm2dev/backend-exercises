import Roles from "../models/RoleModel.js";
import baseRepository from "./BaseRepository.js";

const tablePK = "roleId";

export async function findAllRoles() {
  return baseRepository.findAll(Roles);
}

export async function findRoleById(id) {
  return baseRepository.findByPk(Roles, id);
}

export async function findRoleByName(name) {
  return baseRepository.findOne(Roles, name);
}

export async function saveRole(role) {
  return baseRepository.create(Roles, role);
}

export async function updateRoleById(id, newRoleData) {
  await baseRepository.update(Roles, newRoleData, tablePK, id);
}

export async function deleteRoleById(id) {
  await baseRepository.destroy(Roles, tablePK, id);
}
