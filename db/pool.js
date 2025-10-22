const { Pool } = require("pg");
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";

const connectionString = isDevelopment
  ? process.env.DATABASE_PUBLIC_URL
  : process.env.DATABASE_URL;

module.exports = new Pool({
  connectionString,
});
