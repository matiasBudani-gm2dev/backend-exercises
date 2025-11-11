import Joi from 'joi';

const roleIdSchema = Joi.object({
  role_id: Joi.number().integer().min(1).required(),
});

const rolesIdArraySchema = Joi.object({
  roles_ids: Joi.array().items(Joi.number().integer().min(1).required()),
});

const getUserRolesSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  roleId: Joi.number().integer().min(1).required(),
});

const getUserWithRolesSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  createdAt: Joi.date().max('now').required(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).max(45).required(),
  roles: Joi.array().items(
    Joi.object({
      roleId: Joi.number().integer().min(1).required(),
      roleName: Joi.string().min(3).max(45).required(),
    })
  ),
});

const deleteUserWithEmptyRolesSchema = Joi.object({
  createdAt: Joi.date().max('now').required(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).max(45).required(),
  roles: Joi.array().length(0).required(),
});

export {
  getUserRolesSchema,
  getUserWithRolesSchema,
  roleIdSchema,
  rolesIdArraySchema,
  deleteUserWithEmptyRolesSchema,
};
