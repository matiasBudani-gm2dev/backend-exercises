import Joi from 'joi';

const createPlayerSchema = Joi.object({
  nick: Joi.string().min(1).max(45).required(),
  rating: Joi.number().min(1).max(10).required(),
  position: Joi.string().valid(
    'forward',
    'midfielder',
    'defender',
    'goalkeeper'
  ),
});
