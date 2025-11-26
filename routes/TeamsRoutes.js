import express from "express";

const teamsRoutes = express.Router();

import { getAllTeams } from "../service/TeamsService.js";
teamsRoutes.get("/", 
  async (req, res, next) => {
  try {
    const teams = await getAllTeams();
    res.status(200).send(teams);
  } catch (err) {
    next(err);
  }
});

teamsRoutes.get("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default teamsRoutes;
