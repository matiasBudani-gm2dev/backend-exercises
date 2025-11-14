import { createError } from "../utils/createError.js";

import {
  findAllPlayers,
  findPlayerById,
  findPlayerByNick,
  savePlayer,
  updatePlayer,
  deletePlayerById,
} from "../repository/PlayersRepository.js";

export async function getAllPlayersInfo(deleted) {
  const playersResult = await findAllPlayers(deleted);
  const players = [];
  playersResult.forEach((player) => {
    players.push(player.dataValues);
  });
  return players;
}

export async function getPlayerById(id) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  const playerResult = await findPlayerById(id);
  if (!playerResult) {
    throw createError(404, "Not found", "Player not found");
  }

  const player = playerResult.dataValues;

  return player;
}

export async function getPlayerByNick(nick) {
  const nickFilter = { nick: nick };

  const playerResult = await findPlayerByNick(nickFilter);
  console.log(playerResult);

  if (!playerResult) {
    throw createError(404, "Not found", "Player not found");
  }
  const player = playerResult.dataValues;

  return player;
}

export async function createPlayer(newPlayer) {
  const nickExists = await findPlayerById(newPlayer.nick);
  if (nickExists) {
    throw createError(400, "Bad request", "Nick already exists");
  }

  const playerCreatedResult = await savePlayer(newPlayer);

  const playerCreated = playerCreatedResult.dataValues;

  return playerCreated;
}

export async function updateCompletePlayer(id, playerData) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  const playerExists = await findPlayerById(id);
  if (!playerExists) {
    throw createError(404, "Not found", "Player not found");
  }

  await updatePlayer(id, playerData);

  const playerUpdated = await getPlayerById(id);

  return playerUpdated;
}

export async function updatePartialPlayer(id, playerData) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  const playerExists = await findPlayerById(id);
  if (!playerExists) {
    throw createError(404, "Not found", "Player not found");
  }

  for (const [key, value] of Object.entries(playerData)) {
    if (value === undefined) {
      delete playerData[key];
    }
  }

  await updatePlayer(id, playerData);

  const playerUpdated = await getPlayerById(id);

  return playerUpdated;
}

export async function deletePlayer(id) {
  if (Number.isNaN(id)) {
    throw createError(400, "Bad request", "The id has to be a number");
  }

  await deletePlayerById(id);
}
