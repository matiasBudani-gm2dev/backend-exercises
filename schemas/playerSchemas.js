import Joi from "joi";

const playerSchema = Joi.object({
  nick: Joi.string().min(1).max(45).required(),
  rating: Joi.number().min(1).max(10).required(),
  position: Joi.string()
    .valid("forward", "midfielder", "defender", "goalkeeper")
    .required(),
  number: Joi.number().min(1).max(99),
});

const updatePartialPlayerSchema = Joi.object({
  nick: Joi.string().min(1).max(45),
  rating: Joi.number().min(1).max(10),
  position: Joi.string().valid(
    "forward",
    "midfielder",
    "defender",
    "goalkeeper",
  ),
  number: Joi.number().min(1).max(99),
}).min(1);

export { playerSchema, updatePartialPlayerSchema };
