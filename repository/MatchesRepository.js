import baseRepository from "./BaseRepository.js";
import Matches from "../models/MatchesModel.js";
import TeamsPlayers from "../models/TeamsPlayersModel.js";
import Teams from "../models/TeamsModel.js";

export async function findAllMatches() {
  return baseRepository.findAll(Matches);
}

export async function findMatchById(matchId) {
  return baseRepository.findByPk(Matches, matchId);
}

export async function findTeamById(teamId) {
  return baseRepository.findByPk(Teams, teamId);
}

export async function findTeamPlayersById(teamId) {
  const where = { team_id: teamId };

  return baseRepository.findAll(TeamsPlayers, where);
}

export async function saveMatch(matchData, options = {}) {
  return baseRepository.create(Matches, matchData, options);
}

export async function updateMatch(matchId, matchData, options = {}) {
  return baseRepository.update(Matches, matchData);
}
