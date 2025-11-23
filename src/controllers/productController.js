const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");

async function getProducts(req, res) {
  try {
    const products = await sequelize.query("SELECT * FROM products", {
      type: QueryTypes.SELECT,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProduct(req, res) {
  try {
    const id = req.params.id;
    const rows = await sequelize.query(
      "SELECT * FROM products WHERE id = ? LIMIT 1",
      { replacements: [id], type: QueryTypes.SELECT }
    );
    if (!rows.length) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProducts, getProduct };