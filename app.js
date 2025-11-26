import express from "express";
import cors from "cors";
import userRouter from "./routes/usersRoutes.js";
import roleRouter from "./routes/RoleRoutes.js";
import userRolesRouter from "./routes/UsersRolesRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import playersRouter from "./routes/playerRoutes.js";
import teamsRoutes from "./routes/TeamsRoutes.js";
import matchesRouter from "./routes/MatchesRoutes.js";
import statsRouter from "./routes/StatsRoutes.js";
import { errorHandling } from "./middleware/errorHandler.js";

import {
  authenticateToken,
  authorizeRoles,
} from "./middleware/authentication.js";

export function createApp() {
  const app = express();

  app.set("view engine", "ejs");

  app.get("/", (_req, res) => {
    res.json({
      message: "API de usuarios - Ejercicio 2",
      version: "2.0",
      architecture: "Routes → Repository + Model",
    });
  });

  app.use(express.json());

  app.use(cors());

  app.get("/", (_req, res) => res.json({ ok: true }));

  app.use(
    "/users",
    authenticateToken,
    authorizeRoles(["user", "admin"]),
    userRouter,
  );

  app.use("/roles", authenticateToken, authorizeRoles(["admin"]), roleRouter);

  app.use(
    "/users-roles",
    authenticateToken,
    authorizeRoles(["admin"]),
    userRolesRouter,
  );

  app.use("/auth", authRouter);

  app.use(
    "/players",
    authenticateToken,
    authorizeRoles(["user", "admin"]),
    playersRouter,
  );

  app.use(
    "/teams",
    authenticateToken,
    authorizeRoles(["user", "admin"]),
    teamsRoutes,
  );

  app.use(
    "/matches",
    authenticateToken,
    authorizeRoles(["user", "admin"]),
    matchesRouter,
  );

  app.use("/stats", statsRouter);

  app.use(errorHandling);

  return app;
}

export default createApp;
