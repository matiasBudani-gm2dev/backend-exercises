import express from "express";

const matchesRouter = express.Router();

import { getAllMatches } from "../service/MatchesService.js";

matchesRouter.get("/finalMatch", async (req, res, next) => {
  try {
    const matches = [
      {
        id: 1,
        name: "Diseño vs Desarrollo", //puede ser null
        location: "El mas monumental",
        playersPerTeam: 5,
        homeTeam: {
          id: 1,
          name: "Team A",
          players: [
            {
              id: 10,
              nick: "PlayerOne",
              goals: 1,
              assists: 0,
              rating: 8.5,
            },
          ],
        },
        awayTeam: {
          id: 2,
          name: "Team B",
          players: [
            {
              id: 11,
              nick: "Player2",
              goals: 2,
              assists: 1,
              rating: 5.5,
            },
          ],
        },
        datetime: "2023-10-10T15:00:00Z",
        score: { home: 2, away: 1 }, //si es null y el status es "finished", significa 0-0
        status: ["finished", "pending", "ongoing"],
      },
    ];
    res.status(200).send(matches);
  } catch (err) {
    next(err);
  }
});

matchesRouter.get("/", async (req, res, next) => {
  try {
    const matches = await getAllMatches();

    res.status(200).send(matches);
  } catch (err) {
    next(err);
  }
});

export default matchesRouter;
