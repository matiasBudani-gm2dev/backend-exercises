import Joi from 'joi';

const createRoleSchema = Joi.object({
  role_name: Joi.string().min(3).max(45).required(),
});

const updateCompleteRoleSchema = Joi.object({
  role_name: Joi.string().min(3).max(45).required(),
});

const updatePartialRoleSchema = Joi.object({
  role_name: Joi.string().min(3).max(45),
}).min(1);

const getRoleSchema = Joi.object({
  roleId: Joi.number().integer().min(1).required(),
  roleName: Joi.string().min(3).max(45).required(),
});

export {
  getRoleSchema,
  createRoleSchema,
  updateCompleteRoleSchema,
  updatePartialRoleSchema,
};
