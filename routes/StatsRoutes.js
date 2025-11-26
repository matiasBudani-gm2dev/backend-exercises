import express from "express";
import { sequelize } from "../boostrap.js";

const statsRouter = express.Router();

statsRouter.get("/", async (req, res, next) => {
  try {
    const [[{ activePlayers, averageRating }]] = await sequelize.query(
      "SELECT COUNT(*) as activePlayers, AVG(rating) as averageRating FROM players WHERE deleted = 0",
    );
    const [[{ totalGoals, totalAssists }]] = await sequelize.query(
      "SELECT COUNT(goals) as totalGoals, COUNT(assists) AS totalAssists FROM teams_players",
    );
    res.status(200).send({
      activePlayers,
      totalGoals,
      totalAssists,
      averageRating,
    });
  } catch (err) {
    next(err);
  }
});

statsRouter.get("/players", async (req, res, next) => {
  try {
    const [results] = await sequelize.query(`
SELECT 
      tp.player_id,
      p.nick,
      COUNT(DISTINCT m.match_id) AS matches,
    SUM(tp.goals) AS goals,
    SUM(tp.goals) / COUNT(DISTINCT m.match_id) AS goalsPerMatch,
    p.rating,
    COUNT(DISTINCT CASE 
        WHEN tp.team_id = m.home_team_id AND m.home_team_score > m.away_team_score THEN m.match_id
        WHEN tp.team_id = m.away_team_id AND m.away_team_score > m.home_team_score THEN m.match_id
    END) AS wins,
    COUNT(DISTINCT CASE 
        WHEN tp.team_id = m.home_team_id AND m.home_team_score < m.away_team_score THEN m.match_id
        WHEN tp.team_id = m.away_team_id AND m.away_team_score < m.home_team_score THEN m.match_id
    END) AS losses,
    COUNT(DISTINCT CASE 
        WHEN tp.team_id = m.home_team_id AND m.home_team_score = m.away_team_score THEN m.match_id
        WHEN tp.team_id = m.away_team_id AND m.away_team_score = m.home_team_score THEN m.match_id
    END) AS draws
FROM 
    teams_players tp
LEFT JOIN 
    players p ON p.player_id = tp.player_id
INNER JOIN 
    matches m ON tp.team_id = m.home_team_id OR tp.team_id = m.away_team_id
GROUP BY 
    tp.player_id, p.nick, p.rating;`);

    res.status(200).send(results);
  } catch (err) {
    next(err);
  }
});

export default statsRouter;
