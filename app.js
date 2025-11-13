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

  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://192.168.0.15:3000", // si lo usan en red local
  ];

  app.use(
    cors({
      origin: function (origin, callback) {
        // Permitir herramientas sin origin (Postman, curl, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origen no permitido por CORS: ${origin}`));
        }
      },
      credentials: true,
    }),
  );

  // Resto de tu API
  app.get("/", (req, res) => res.json({ ok: true }));

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
