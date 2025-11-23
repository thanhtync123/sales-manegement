const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,     // database
  process.env.DB_USER,     // username
  process.env.DB_PASSWORD, // password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected!");
  } catch (err) {
    console.error("Unable to connect to DB:", err);
  }
}

module.exports = { sequelize, connectDB };
