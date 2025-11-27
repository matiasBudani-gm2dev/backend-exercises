import { createError } from "../utils/createError.js";

import { sequelize } from "../boostrap.js";

import { getPlayerById } from "./playersService.js";

import {
  findAllMatches,
  findMatchById,
  findTeamById,
  findTeamPlayersById,
  saveMatch,
  updateMatchById,
} from "../repository/MatchesRepository.js";

import { saveTeam } from "../repository/TeamsRepository.js";
import { saveTeamPlayer } from "../repository/TeamsPlayersRepository.js";
import { updateTeamPlayer } from "../repository/TeamsPlayersRepository.js";

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

      await Promise.all(
        homeTeamPlayers.map(async (teamPlayer) => {
          const player = await getPlayerById(teamPlayer.dataValues.player_id);
          homePlayers.push({
            id: player.player_id,
            nick: player.nick,
            rating: player.rating,
            goals: teamPlayer.dataValues.goals,
            assists: teamPlayer.dataValues.assists,
          });
        }),
      );
      homeTeam.players = homePlayers;

      const awayTeamPlayers = await findTeamPlayersById(match.away_team_id);

      await Promise.all(
        awayTeamPlayers.map(async (teamPlayer) => {
          const player = await getPlayerById(teamPlayer.dataValues.player_id);
          awayPlayers.push({
            id: player.player_id,
            nick: player.nick,
            rating: player.rating,
            goals: teamPlayer.dataValues.goals,
            assists: teamPlayer.dataValues.assists,
          });
        }),
      );
      awayTeam.players = awayPlayers;

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

  return matches;
}

export async function getAllMatchesStats() {
  const [[{ totalMatches }]] = await sequelize.query(
    "SELECT COUNT(*) as totalMatches FROM matches",
  );
  const [[{ totalGoals, totalAssists }]] = await sequelize.query(
    "SELECT COALESCE(SUM(goals), 0) as totalGoals, COALESCE(SUM(assists), 0) AS totalAssists FROM teams_players",
  );
  const [[{ activePlayers }]] = await sequelize.query(
    "SELECT COUNT(*) as activePlayers FROM players WHERE deleted = 0",
  );
  return {
    totalMatches,
    totalGoals: Number(totalGoals),
    totalAssists: Number(totalAssists),
    activePlayers,
  };
}

export async function getMatchById(matchId) {
  const matchesResult = await findMatchById(matchId);

  const match = matchesResult.dataValues;

  if (!match) {
    throw createError(404, "Not found ", "Match was not found");
  }

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

  await Promise.all(
    homeTeamPlayers.map(async (teamPlayer) => {
      const player = await getPlayerById(teamPlayer.dataValues.player_id);
      homePlayers.push({
        id: player.player_id,
        nick: player.nick,
        rating: player.rating,
        goals: teamPlayer.dataValues.goals,
        assists: teamPlayer.dataValues.assists,
      });
    }),
  );

  homeTeam.players = homePlayers;

  const awayTeamPlayers = await findTeamPlayersById(match.away_team_id);

  await Promise.all(
    awayTeamPlayers.map(async (teamPlayer) => {
      const player = await getPlayerById(teamPlayer.dataValues.player_id);
      awayPlayers.push({
        id: player.player_id,
        nick: player.nick,
        rating: player.rating,
        goals: teamPlayer.dataValues.goals,
        assists: teamPlayer.dataValues.assists,
      });
    }),
  );

  awayTeam.players = awayPlayers;

  match.homeTeam = homeTeam;
  match.awayTeam = awayTeam;

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
  } = match;

  return {
    ...matchData,
    homeTeam,
    awayTeam,
    score,
  };
}

export async function createMatch(matchData) {
  const homeTeamName = { name: matchData.homeTeam.name };
  const awayTeamName = { name: matchData.awayTeam.name };

  await sequelize.transaction(async (t) => {
    const homeTeam = (await saveTeam(homeTeamName, { transaction: t }))
      .dataValues;
    const awayTeam = (await saveTeam(awayTeamName, { transaction: t }))
      .dataValues;

    const homePlayersIds = matchData.homeTeam.playersIds;
    const awayPlayersIds = matchData.awayTeam.playersIds;

    await Promise.all(
      homePlayersIds.map(async (playerId) => {
        const player = await getPlayerById(playerId, { transaction: t });

        if (!player) {
          throw createError(
            404,
            "Not found",
            `Player ID ${playerId} not found`,
          );
        }
        await saveTeamPlayer(
          { team_id: homeTeam.team_id, player_id: playerId },
          { transaction: t },
        );
      }),
    );

    await Promise.all(
      awayPlayersIds.map(async (playerId) => {
        const player = await getPlayerById(playerId, { transaction: t });

        if (!player) {
          throw createError(
            404,
            "Not found",
            `Player ID ${playerId} not found`,
          );
        }
        await saveTeamPlayer(
          { team_id: awayTeam.team_id, player_id: playerId },
          { transaction: t },
        );
      }),
    );

    const matchRecord = {
      name: matchData.name,
      location: matchData.location,
      playerPerTeam: matchData.playerPerTeam,
      match_date: matchData.match_date,
      home_team_id: homeTeam.team_id,
      away_team_id: awayTeam.team_id,
    };
    await saveMatch(matchRecord, { transaction: t });
  });
}

export async function updateMatch(matchId, updateData) {
  return await sequelize.transaction(async (t) => {
    const fieldsToUpdate = {};
    const allowedFields = [
      "name",
      "location",
      "match_date",
      "status",
      "home_team_score",
      "away_team_score",
    ];
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        fieldsToUpdate[key] = updateData[key];
      }
    }

    await updateMatchById(matchId, fieldsToUpdate, { transaction: t });

    if (updateData.home_team?.players) {
      for (const player of updateData.home_team.players) {
        const updatePlayerData = {};
        if (player.goals !== undefined) updatePlayerData.goals = player.goals;
        if (player.assists !== undefined)
          updatePlayerData.assists = player.assists;

        if (Object.keys(updatePlayerData).length > 0) {
          await updateTeamPlayer(
            {
              team_id: updateData.home_team.team_id,
              player_id: player.id,
              ...updatePlayerData,
            },
            { transaction: t },
          );
        }
      }
    }

    if (updateData.away_team?.players) {
      for (const player of updateData.away_team.players) {
        const updatePlayerData = {};
        if (player.goals !== undefined) updatePlayerData.goals = player.goals;
        if (player.assists !== undefined)
          updatePlayerData.assists = player.assists;

        if (Object.keys(updatePlayerData).length > 0) {
          await updateTeamPlayer(
            {
              team_id: updateData.away_team.team_id,
              player_id: player.id,
              ...updatePlayerData,
            },
            { transaction: t },
          );
        }
      }
    }

    return await getMatchById(matchId);
  });
}
