import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
dotenv.config();

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: process.env.DB_NAME || "uberclone",
  synchronize: true,
  logging: true,
  entities: ["entities/**/*.*"],
  host: process.env.DB_ENDPOINT,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

export default connectionOptions;
