const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");

async function getProducts(req, res) {
  try {
    const products = await sequelize.query("SELECT * FROM Products", {
      type: QueryTypes.SELECT,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function createProduct(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const query = `INSERT INTO Products (name, email, password, role) 
                 VALUES ('${name}','${email}','${password}','${role}')`;
    await sequelize.query(query);
    res.json({
      message: "Thêm thành công"
    });
  } catch (err) {
    res.json({
      message: err.message
    });
  }
}
async function deleteProduct(req, res) {
  try {
    const query = `DELETE FROM Products WHERE (id = '${req.params.id}')`;
    await sequelize.query(query);
    res.json({
      message: "Xóa thành công"
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
}
async function updateProduct(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const query = `UPDATE Products SET name = '${name}', email = '${email}', password = '${password}', role = '${role}' 
                    WHERE (id = '${req.params.id}')`;
    await sequelize.query(query);
    res.json({
      message: "Sửa thành công"
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
}

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct

};