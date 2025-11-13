import express from "express";

const playersRouter = express.Router();

import { schemaReqValidation } from "../middleware/validation.js";
import {
  getAllPlayersInfo,
  getPlayerById,
  getPlayerByNick,
  createPlayer,
  updateCompletePlayer,
  updatePartialPlayer,
  deletePlayer,
} from "../service/playersService.js";

import {
  playerSchema,
  updatePartialPlayerSchema,
} from "../schemas/playerSchemas.js";

playersRouter.get("/", async (req, res, next) => {
  try {
    const { deleted } = req.query;
    console.log("deleted", deleted);
    const players = await getAllPlayersInfo(deleted);
    res.status(200).send(players);
  } catch (err) {
    next(err);
  }
});

playersRouter.get("/id/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const playerResult = await getPlayerById(id);
    res.status(200).send(playerResult);
  } catch (err) {
    next(err);
  }
});

playersRouter.get("/nick/:nick", async (req, res, next) => {
  try {
    const nick = req.params.nick;
    const player = await getPlayerByNick(nick);
    res.status(200).send(player);
  } catch (err) {
    next(err);
  }
});

playersRouter.post(
  "/",
  schemaReqValidation(playerSchema),
  async (req, res, next) => {
    try {
      const { nick, rating, position, number } = req.body;
      const player = await createPlayer({ nick, rating, position, number });
      res.status(201).send(player);
    } catch (err) {
      next(err);
    }
  },
);

playersRouter.put(
  "/:id",
  schemaReqValidation(playerSchema),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const { nick, rating, position, number } = req.body;
      const player = await updateCompletePlayer(id, {
        nick,
        rating,
        position,
        number,
      });
      res.status(200).send(player);
    } catch (err) {
      next(err);
    }
  },
);

playersRouter.patch(
  "/:id",
  schemaReqValidation(updatePartialPlayerSchema),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { nick, rating, position, number } = req.body;
      const player = await updatePartialPlayer(id, {
        nick,
        rating,
        position,
        number,
      });
      res.status(200).send(player);
    } catch (err) {
      next(err);
    }
  },
);

playersRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await deletePlayer(id);

    res.status(204);
  } catch (err) {
    next(err);
  }
});

export default playersRouter;
