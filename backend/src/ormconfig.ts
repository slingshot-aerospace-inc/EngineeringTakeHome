import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConnectionOptions } from "typeorm";
import config from "./config";

const connection: ConnectionOptions = {
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  type: "postgres",
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: false,
  entities: [__dirname + "/schema/**/*Entity{.ts,.js}"],
  migrations: [__dirname + "/database/migrations/**/*{.ts,.js}"],
  // subscribers: [__dirname + '/schema/**/subscriber{.ts,.js}'],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  namingStrategy: new SnakeNamingStrategy(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore additional fields for typeorm-seeding
  seeds: [__dirname + "/database/seeds/**/*Seed{.ts,.js}"],
  factories: [__dirname + "/schema/**/*Factory{.ts,.js}"],
};

export default connection;
