import dotenv from "dotenv";

dotenv.config();

import { Sequelize } from "sequelize";

// SERVER
// const sequelize = new Sequelize(
//   process.env.MYSQL_DATABASE,
//   process.env.MYSQL_USER,
//   process.env.MYSQL_PASSWORD,
//   {
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     dialect: "mysql",
//   },
// );

// LOCAL
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
);
export { sequelize };
