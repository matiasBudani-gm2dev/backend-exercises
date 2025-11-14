import baseRepository from "./BaseRepository.js";
import Players from "../models/PlayerModel.js";

const playersTable = {
  tableName: "players",
  tablePK: "player_id",
};

export async function findAllPlayers(deleted) {
  const where = {};

  if (deleted !== undefined) {
    where.deleted = deleted;
  }

  return baseRepository.findAll(Players, where);
}

export async function findPlayerById(id) {
  return baseRepository.findByPk(Players, id);
}

export async function findPlayerByNick(nick) {
  return baseRepository.findOne(Players, nick);
}

export async function savePlayer(player) {
  return baseRepository.create(Players, player);
}

export async function updatePlayer(id, newPlayerData) {
  await baseRepository.update(Players, newPlayerData, playersTable.tablePK, id);
}

export async function deletePlayerById(id) {
  await baseRepository.update(
    Players,
    { deleted: true, nick: null },
    playersTable.tablePK,
    id,
  );
}
