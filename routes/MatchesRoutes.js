import express from "express";

const matchesRouter = express.Router();

import { getAllMatches, getMatchById } from "../service/MatchesService.js";

matchesRouter.get("/", async (req, res, next) => {
  try {
    const matches = await getAllMatches();
    res.status(200).send(matches);
  } catch (err) {
    next(err);
  }
});

matchesRouter.get("/:id", async (req, res, next) => {
  try {
    const matchId = Number(req.params.id);
    const matches = await getMatchById(matchId);
    res.status(200).send(matches);
  } catch (err) {
    next(err);
  }
});

export default matchesRouter;
