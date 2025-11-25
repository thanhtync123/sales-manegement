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
async function createCategory(req, res) {
    const { name, description } = req.body;
    const query = `INSERT INTO categories (name, description) VALUES ('${name}', '${description}') `;
    try {
        await sequelize.query(query);
        return res.status(201).json({ message: "Thành công" });
    } catch (err) {
        return res.status(500).json({
            message: "Lỗi server" + err + query
        });
    }
}
async function deleteCategory(req, res) {
    const id = req.params.id;
    const query = `DELETE FROM categories WHERE (id = ${id}); `;
    try {
        await sequelize.query(query);
        return res.status(201).json({ message: "Thành công" });
    } catch (err) {
        return res.status(500).json({
            message: "Lỗi server" + err + query
        });
    }
}
async function updateCategory(req, res) {
    const id = req.params.id;
    const { name, description } = req.body;
    const query = `UPDATE categories SET name = '${name}', description = '${description}' WHERE (id = '${id}'); `;
    try {
        await sequelize.query(query);
        return res.status(201).json({ message: "Thành công" });
    } catch (err) {
        return res.status(500).json({
            message: "Lỗi server" + err + query
        });
    }
}
module.exports = {
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory

};