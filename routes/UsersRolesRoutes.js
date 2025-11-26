import express from "express";
const userRolesRouter = express.Router();

import {
  getAllUsersWithSpecificRoleInfo,
  getAllRolesFromUser,
  createNewUserRole,
  getAllUsersRoles,
  updateNewUserRoles,
  getUserRole,
} from "../service/UsersRolesService.js";

import {
  getUserRolesSchema,
  getUserWithRolesSchema,
  roleIdSchema,
  rolesIdArraySchema,
  deleteUserWithEmptyRolesSchema,
} from "../schemas/userRolesSchemas.js";
import { getUserSchema } from "../schemas/userSchemas.js";

import {
  schemaReqValidation,
  schemaResValidation,
} from "../middleware/validation.js";


userRolesRouter.get(
  "/",
  async (req, res, next) => {
    try {
      const usersRoles = await getAllUsersRoles();
      usersRoles.map((userRole) => {
        schemaResValidation(getUserRolesSchema);
      });
      res.status(200).send(usersRoles);
    } catch (err) {
      next(err);
    }
  },
);

userRolesRouter.get(
  "/:id",
  schemaReqValidation(roleIdSchema),
  async (req, res, next) => {
    try {
      const user_id = Number(req.params.id);
      const { role_id } = req.body;

      const userRole = await getUserRole({ role_id, user_id });

      const isError = schemaResValidation(getUserRolesSchema, userRole);
      if (isError) {
        res.status(400).send(isError);
        return;
      }
      res.status(200).send(userRole);
    } catch (err) {
      next(err);
    }
  },
);

userRolesRouter.get(
  "/users/:id",
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const users = await getAllUsersWithSpecificRoleInfo(id);

      users.map((user) => {
        const isError = schemaResValidation(getUserSchema, user);
        if (isError) {
          res.status(400).send(isError);
        } else {
          res.status(200).send(users);
        }
      });
    } catch (err) {
      next(err);
    }
  },
);

userRolesRouter.get(
  "/roles/:id",
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const userWithRoles = await getAllRolesFromUser(id);

      const isError = schemaResValidation(
        getUserWithRolesSchema,
        userWithRoles,
      );
      if (isError) {
        res.status(400).send(isError);
        return;
      }

      res.status(200).send(userWithRoles);
    } catch (err) {
      next(err);
    }
  },
);

userRolesRouter.post(
  "/:id",
  schemaReqValidation(roleIdSchema),
  async (req, res, next) => {
    try {
      const user_id = Number(req.params.id);
      const { role_id } = req.body;
      const userWithRoles = await createNewUserRole({ role_id, user_id });
      const isError = schemaResValidation(
        getUserWithRolesSchema,
        userWithRoles,
      );
      if (isError) {
        res.status(400).send(isError);
        return;
      }
      res.status(201).send(userWithRoles);
    } catch (err) {
      next(err);
    }
  },
);

userRolesRouter.put(
  "/:id",
  schemaReqValidation(rolesIdArraySchema),
  async (req, res, next) => {
    try {
      const user_id = Number(req.params.id);
      const { roles_ids } = req.body;
      const userWithRoles = await updateNewUserRoles({ roles_ids, user_id });
      const isError = schemaResValidation(
        getUserWithRolesSchema,
        userWithRoles,
      );
      if (isError) {
        res.status(400).send(isError);
        return;
      }
      res.status(200).send(userWithRoles);
    } catch (err) {
      next(err);
    }
  },
);

userRolesRouter.delete(
  "/:id",
  async (req, res, next) => {
    const user_id = Number(req.params.id);
    const user = await updateNewUserRoles({ roles_ids: [], user_id });
    user.roles = [{ roleId: 2, roleName: "el papu" }];
    const isError = schemaResValidation(deleteUserWithEmptyRolesSchema, user);
    if (isError) {
      res.status(400).send(isError);
      return;
    }
    res.status(200).send(user);
  },
);

export default userRolesRouter;
