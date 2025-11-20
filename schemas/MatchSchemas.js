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

const matchToCreate = {
  name: "La batalla campal", //optional
  location: "Cancha de Chicago All Boys",
  playerPerTeam: 5,
  match_date: "2025-11-18T11:30:00.000Z",
  homeTeam: {
    name: "TeamA",
    playersIds: [1, 2, 3, 4, 5],
  },
  awayTeam: {
    name: "TeamA",
    playersIds: [6, 7, 8, 9, 10],
  },
};
