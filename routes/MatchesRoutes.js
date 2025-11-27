import express from "express";

const matchesRouter = express.Router();

import {
  getAllMatches,
  getAllMatchesStats,
  getMatchById,
  createMatch,
  updateMatch,
} from "../service/MatchesService.js";
import { createMatchSchema } from "../schemas/MatchSchemas.js";
import { schemaReqValidation } from "../middleware/validation.js";
import { authorizeRoles } from "../middleware/authentication.js";

matchesRouter.get("/", async (_req, res, next) => {
  try {
    const matches = await getAllMatches();
    res.status(200).send(matches);
  } catch (err) {
    next(err);
  }
});

matchesRouter.get("/stats", async (_req, res, next) => {
  try {
    const stats = await getAllMatchesStats();
    res.status(200).send(stats);
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

matchesRouter.post(
  "/",
  authorizeRoles(["admin"]),
  schemaReqValidation(createMatchSchema),
  async (req, res, next) => {
    try {
      const matchData = req.body;
      await createMatch(matchData);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  },
);

matchesRouter.patch(
  "/:id",
  authorizeRoles(["admin"]),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const matchData = req.body;
      const match = await updateMatch(id, matchData);
      res.status(200).send(match);
    } catch (err) {
      next(err);
    }
  },
);

export default matchesRouter;
