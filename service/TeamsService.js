import { createError } from "../utils/createError.js";

import {
  findAllTeams,
  findTeamById,
  saveTeam,
  updateTeamById,
} from "../repository/TeamsRepository.js";

export async function getAllTeams() {
  const teams = findAllTeams();
  if (!teams) {
    throw createError(
      500,
      "Internal server error",
      "Error conecting to database",
    );
  }
  return teams;
}
