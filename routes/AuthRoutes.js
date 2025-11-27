import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";

import { createNewUser, getUserbyEmail } from "../service/userService.js";
import { getRoleByName } from "../service/RolesService.js";
import {
  createNewUserRole,
  getAllRolesFromUser,
} from "../service/UsersRolesService.js";
import {
  authorizeRoles,
  authenticateToken,
} from "../middleware/authentication.js";
import { createUserSchema } from "../schemas/userSchemas.js";
import { generateCodeForUser } from "../service/verificationCodesService.js";
import { loginSchema, verifyUserSchema } from "../schemas/authSchemas.js";
import { schemaReqValidation } from "../middleware/validation.js";

const authRouter = express.Router();

const requiredFields = ["user_name", "password"];

authRouter.post(
  "/register",
  schemaReqValidation(createUserSchema),
  async (req, res, next) => {
    try {
      const { user_name, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      const roleUser = await getRoleByName("user");

      const newUser = await createNewUser({ user_name, email, passwordHash });

      const user_id = newUser.userId;
      const role_id = roleUser.roleId;

      await createNewUserRole({ user_id, role_id });

      await generateCodeForUser(user_id);

      res.status(201).send(newUser);
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post(
  "/register/verify",
  schemaReqValidation(verifyUserSchema),
  async (req, res, next) => {
    const { email, code } = req.body;
    // ... verify
    // SELECT * FROM users where email = 'EMAIL'
    //SELECT * FROM verification_codes where user_id = 10 and code = '123456' and expired_at > NOW();
    // UPDATE users SET is_verified = true where user_id = ???
  },
);

authRouter.post(
  "/login",
  schemaReqValidation(loginSchema),
  async (req, res, next) => {
    const { email, password } = req.body;
    const user = await getUserbyEmail(email);

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) return res.status(400).send("Credenciales invalidas");

    const userWithRoles = await getAllRolesFromUser(user.userId);

    const token = jwt.sign(userWithRoles, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const accessToken = { accessToken: token };

    res.status(200).send(accessToken);
  },
);

authRouter.get(
  "/admin/dashboard",
  authenticateToken,
  authorizeRoles(["admin"]),
  (req, res, next) => {
    res.json("Entras al admin dashboard");
  },
);

export default authRouter;
