export default {
  // App's VERSION
  VERSION: process.env.VERSION ?? "v0.0.0",

  // Server Listen Port
  PORT: process.env.PORT || 3001,

  // Database connection params
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: Number(process.env.DB_PORT ?? "5432"),
  DB_USER: process.env.DB_USER ?? "postgres",
  DB_PASS: process.env.DB_PASS ?? "password",
  DB_NAME: process.env.DB_NAME ?? "postgres",
};
