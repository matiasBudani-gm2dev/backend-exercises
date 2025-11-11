import Joi from "joi";

const playerSchema = Joi.object({
  nick: Joi.string().min(1).max(45).required(),
  rating: Joi.number().min(1).max(10).required(),
  position: Joi.string()
    .valid("forward", "midfielder", "defender", "goalkeeper")
    .required(),
  number: Joi.number().min(1).max(99),
});

export { playerSchema };
