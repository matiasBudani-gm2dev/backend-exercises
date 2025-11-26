import Joi from "joi";

const matchSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  location: Joi.string().min(3).max(100).required(),
  playerPerTeam: Joi.number().integer().min(5).max(9).required(),
  match_date: Joi.date().iso().required(),
  homeTeam: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    playersIds: Joi.array()
      .items(Joi.number().integer().positive())
      .min(5)
      .max(9)
      .required(),
  }).required(),
  awayTeam: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    playersIds: Joi.array()
      .items(Joi.number().integer().positive())
      .min(5)
      .max(9)
      .required(),
  }).required(),
});

const createMatchSchema = Joi.object({
  name: Joi.string(),
  location: Joi.string().required(),
  playerPerTeam: Joi.number().integer().min(1).required(),
  match_date: Joi.date().iso().required(),

  homeTeam: Joi.object({
    name: Joi.string().required(),
    playersIds: Joi.array()
      .items(Joi.number().integer().positive())
      .min(5)
      .max(9)
      .required(),
  }).required(),

  awayTeam: Joi.object({
    name: Joi.string().required(),
    playersIds: Joi.array()
      .items(Joi.number().integer().positive())
      .length(5)
      .required(),
  }).required(),
});

const updateMatchSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  match_date: Joi.date().iso().required(),
  status: Joi.string().valid("finished", "in progress", "cancelled").optional(),

  home_team: Joi.object({
    players: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().integer().positive().required(),
          goals: Joi.number().integer().min(0).optional(),
          assists: Joi.number().integer().min(0).optional(),
        }),
      )
      .optional(),
  }).optional(),

  away_team: Joi.object({
    players: Joi.array()
      .items(
        Joi.object({
          id: Joi.number().integer().positive().required(),
          goals: Joi.number().integer().min(0).optional(),
          assists: Joi.number().integer().min(0).optional(),
        }),
      )
      .optional(),
  }).optional(),
});

export { createMatchSchema };
