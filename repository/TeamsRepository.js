import baseRepository from "./BaseRepository.js";
import Teams from "../models/TeamsModel.js";

const teamsTable = {
  tablePK: "team_id",
};

export async function findAllTeams() {
  return baseRepository.findAll(Teams);
}

export async function findTeamById(id) {
  return baseRepository.findByPk(Teams, id);
}

export async function saveTeam(team) {
  return baseRepository.create(Teams, team);
}

export async function updateTeamById(id, newTeamData) {
  await baseRepository.update(Teams, newTeamData, teamsTable.tablePK, id);
}
