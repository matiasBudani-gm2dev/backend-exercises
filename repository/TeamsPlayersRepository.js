import TeamsPlayers from "../models/TeamsPlayersModel.js";
import baseRepository from "./BaseRepository.js";

export async function saveTeamPlayer(teamPlayer, options = {}) {
  return baseRepository.create(TeamsPlayers, teamPlayer, options);
}
