import Joi from "joi";

const createTeamSchema = Joi.object({
  player_id: Joi.number().integer().min(1),
  team_number: Joi.number().integer().valid(1, 2),
});
