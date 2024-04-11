// imports the pool and Pool objects from the pg library.
const { Pool } = require("pg");

// defines a function dbConnection using an immediately-invoked function
const dbConnection = () => {
  try {
    // create a new Pool object with the configuration provided through environment variables.
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: process.env.SSL,
    });
    return pool;
    //If an error occurs during the creation of the Pool object, it throws an error
  } catch (error) {
    throw new Error(error.message);
  }
};

//The module exports an object with a property dbConnection
module.exports = { dbConnection };
