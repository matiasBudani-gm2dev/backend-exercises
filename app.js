import express from "express";
import cors from "cors";
import userRouter from "./routes/usersRoutes.js";
import roleRouter from "./routes/RoleRoutes.js";
import userRolesRouter from "./routes/UsersRolesRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import playersRouter from "./routes/playerRoutes.js";
import teamsRoutes from "./routes/TeamsRoutes.js";
import { errorHandling } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.json({
      message: "API de usuarios - Ejercicio 2",
      version: "2.0",
      architecture: "Routes → Repository + Model",
    });
  });

  app.use(express.json());

  app.use(cors());

  app.use("/users", userRouter);

  app.use("/roles", roleRouter);

  app.use("/users-roles", userRolesRouter);

  app.use("/auth", authRouter);

  app.use("/players", playersRouter);

  app.use("teams", teamsRoutes);

  app.use(errorHandling);

  return app;
}

export default createApp;
