import { createError } from "../utils/createError.js";

import {
  createUser,
  updateUser,
  getUserWithoutPassword,
} from "../models/UserModel.js";
import {
  findAllUsers,
  findByEmail,
  findUserById,
  saveUser,
  updateUserById,
  deleteUserById,
} from "../repository/UsersRepository.js";

export async function getUsersWithoutPassword(users) {
  if (!Array.isArray(users)) {
    throw createError(404, "Not found", `${users} is not a list`);
  }
  return users.map(
    ({ password, ...userWithoutPassword }) => userWithoutPassword,
  );
}

export async function getAllUsersInfo() {
  const usersResult = await findAllUsers();
  const users = [];
  usersResult.forEach((userResult) => {
    users.push(userResult.dataValues);
  });
  return getUsersWithoutPassword(users);
}

export async function getUserById(id) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }
  const userResult = await findUserById(id);

  if (!userResult) {
    throw createError(404, "Not found", "User not Found");
  }

  const user = userResult.dataValues;

  return getUserWithoutPassword(user);
}

export async function getUserbyEmail(email) {
  const emailFilter = { email: email };

  const userResult = await findByEmail(emailFilter);

  if (!userResult) {
    throw createError(404, "Not found", "User not Found");
  }

  const user = userResult.dataValues;

  return user;
}

export async function createNewUser(userData) {
  const emailFilter = { email: userData.email };

  const userFound = await findByEmail(emailFilter);

  if (userFound) {
    throw createError(409, "Conflict Error", "El email ya existe");
  }

  const newUser = await createUser(userData);

  if (!newUser) {
    throw createError(500, "Internal Server Error", "User not created");
  }

  const userCreated = await saveUser(newUser);

  const userId = userCreated.dataValues.userId;

  const safeUser = await getUserById(userId);

  return safeUser;
}
export async function updateUserComplete(id, userData) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  const emailFilter = { email: userData.email };

  const userFound = await findByEmail(emailFilter);

  if (userFound) {
    throw createError(409, "Conflict Error", "Existing email");
  }
  if (!(await findUserById(id))) {
    throw createError(404, "Not found", "User not found");
  }

  const user = await updateUser(userData);

  await updateUserById(id, user);

  const safeUser = await getUserById(id);

  return safeUser;
}

export async function updateUserPartial(id, userData) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  if (userData.email) {
    const emailFilter = { email: userData.email };
    const userFound = await findByEmail(emailFilter);
    if (userFound) throw createError(409, "Conflict Error", "Existing email");
  }

  if (!(await findUserById(id))) {
    throw createError(404, "Not found", "User not found");
  }
  const user = await updateUser(userData);

  for (const [key, value] of Object.entries(user)) {
    if (value === undefined) {
      delete user[key];
    }
  }

  await updateUserById(id, user);

  const safeUser = await getUserById(id);

  return safeUser;
}

export async function deleteUser(id) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  const user = await getUserById(id);
  await deleteUserById(id);
  return user;
}
