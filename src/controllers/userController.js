const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");

async function getUsers(req, res) {
  try {
    const products = await sequelize.query("SELECT * FROM users", {
      type: QueryTypes.SELECT,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsers, getUsers };