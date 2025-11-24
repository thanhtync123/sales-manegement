const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");

async function getCategories(req, res) {
    try {
        const products = await sequelize.query("SELECT * FROM Categories order by name asc", {
            type: QueryTypes.SELECT,
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {
    getCategories

};