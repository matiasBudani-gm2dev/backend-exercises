import { createError } from "../utils/createError.js";

import {
  findAllMatches,
  findTeamById,
  findTeamPlayersById,
} from "../repository/MatchesRepository.js";

import { getPlayerById } from "./playersService.js";

export async function getAllMatches() {
  const matchesResult = await findAllMatches();
  if (!matchesResult) {
    throw createError(
      500,
      "Internal server error",
      "Error connecting to database",
    );
  }

  const matches = await Promise.all(
    matchesResult.map(async (match) => {
      const homeTeam = {};
      const awayTeam = {};
      const homePlayers = [];
      const awayPlayers = [];

      homeTeam.id = match.home_team_id;
      awayTeam.id = match.away_team_id;

      const homeTeamData = await findTeamById(match.home_team_id);
      const awayTeamData = await findTeamById(match.away_team_id);

      homeTeam.name = homeTeamData.dataValues.name;
      awayTeam.name = awayTeamData.dataValues.name;

      const homeTeamPlayers = await findTeamPlayersById(match.home_team_id);

      homeTeamPlayers.forEach(async (teamPlayer) => {
        const player = await getPlayerById(teamPlayer.dataValues.player_id);
        homePlayers.push({
          id: player.player_id,
          nick: player.nick,
          rating: player.rating,
          goals: teamPlayer.dataValues.goals,
          assists: teamPlayer.dataValues.assists,
        });
      });
      homeTeam.players = homePlayers;

      const awayTeamPlayers = await findTeamPlayersById(match.away_team_id);

      awayTeamPlayers.forEach(async (teamPlayer) => {
        const player = await getPlayerById(teamPlayer.dataValues.player_id);
        awayPlayers.push({
          id: player.player_id,
          nick: player.nick,
          rating: player.rating,
          goals: teamPlayer.dataValues.goals,
          assists: teamPlayer.dataValues.assists,
        });
      });

      match.dataValues.homeTeam = homeTeam;
      match.dataValues.awayTeam = awayTeam;

      const score = {
        home: match.home_team_score,
        away: match.away_team_score,
      };

      const {
        home_team_score,
        away_team_score,
        home_team_id,
        away_team_id,
        ...matchData
      } = match.dataValues;

      return {
        ...matchData,
        homeTeam,
        awayTeam,
        score,
      };
    }),
  );

  console.log("FINAL MATCHES:");
  console.log(matches);

  return matches;
}
