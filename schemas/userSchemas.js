import Joi from "joi";

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  user_name: Joi.string().min(3).max(45).required(),
  password: Joi.string().min(6).max(40).required(),
});

export const updateCompleteUserSchema = Joi.object({
  email: Joi.string().email().required(),
  user_name: Joi.string().min(3).max(45).required(),
});

export const updatePartialUserSchema = Joi.object({
  email: Joi.string().email(),
  user_name: Joi.string().min(3).max(45),
}).min(1);

export const getUserSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  createdAt: Joi.date().max("now").required(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).max(45).required(),
});
