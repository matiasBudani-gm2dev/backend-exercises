import TeamsPlayers from "../models/TeamsPlayersModel.js";
import baseRepository from "./BaseRepository.js";

export async function saveTeamPlayer(teamPlayer, options = {}) {
  return baseRepository.create(TeamsPlayers, teamPlayer, options);
}

export async function updateTeamPlayer(teamPlayer, options = {}) {
  const { team_id, player_id, ...rest } = teamPlayer;
  return baseRepository.updateWhereKeys(
    TeamsPlayers,
    rest,
    { team_id, player_id },
    options,
  );
}
