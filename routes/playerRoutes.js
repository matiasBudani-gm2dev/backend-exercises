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
    let { deleted } = req.query;

    if (deleted !== undefined) {
      if (deleted === "true") deleted = true;
      else if (deleted === "false") deleted = false;
      else if (deleted === "all") deleted = undefined;
      else return res.status(400).send({ error: "Invalid deleted value" });
    } else {
      deleted = false;
    }

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

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default playersRouter;
