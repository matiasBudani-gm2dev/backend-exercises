import express from 'express';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

import {
  getAllUsersInfo,
  getUserById,
  createNewUser,
  deleteUser,
  updateUserComplete,
  updateUserPartial,
} from '../service/userService.js';

import {
  schemaReqValidation,
  schemaResValidation,
} from '../middleware/validation.js';
import {
  getUserSchema,
  createUserSchema,
  updateCompleteUserSchema,
  updatePartialUserSchema,
} from '../schemas/userSchemas.js';

import {
  authenticateToken,
  authorizeRoles,
} from '../middleware/authentication.js';

userRouter.get(
  '/',
  authenticateToken,
  authorizeRoles(['user', 'admin']),
  async (req, res, next) => {
    try {
      const users = await getAllUsersInfo();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  '/:id',
  authenticateToken,
  authorizeRoles(['user', 'admin']),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await getUserById(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  '/',
  schemaReqValidation(createUserSchema),
  authenticateToken,
  authorizeRoles(['admin']),
  async (req, res, next) => {
    try {
      const { user_name, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await createNewUser({ user_name, email, passwordHash });

      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  '/:id',
  schemaReqValidation(updateCompleteUserSchema),
  authenticateToken,
  authorizeRoles(['admin']),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { user_name, email } = req.body;

      const user = await updateUserComplete(id, { user_name, email });
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  '/:id',
  schemaReqValidation(updatePartialUserSchema),
  authenticateToken,
  authorizeRoles(['admin']),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { user_name, email } = req.body;

      const user = await updateUserPartial(id, { user_name, email });

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(['admin']),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await deleteUser(id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
