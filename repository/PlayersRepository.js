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

  const order = [["player_id", "DESC"]];

  return baseRepository.findAll(Players, where, order);
}

export async function findPlayerById(id, options = {}) {
  return baseRepository.findByPk(Players, id, options);
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
    { deleted: true },
    playersTable.tablePK,
    id,
  );
}
