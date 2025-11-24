const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");

async function getProducts(req, res) {
  try {
    const query = `
    SELECT p.id, p.name, c.name as category_name, p.sku, p.price, p.stock, p.image, p.description
    FROM products p
    INNER JOIN categories c ON c.id=p.category_id
    ORDER by p.id ASC
      `;
    const products = await sequelize.query(query);
    res.json(products[0]);

  } catch (err) {
    res.json({
      message: err.message
    });
  }
}
async function createProduct(req, res) {
  try {
    const { name, category, sku, price,stock, image, description } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    const query = `
    INSERT INTO Products (name, category_id, sku, price, stock, image, description)
    VALUES ('${name}', '${category}', '${sku}', '${price}', '${stock}', '${imagePath}', '${description}');
                `;
    await sequelize.query(query);
    res.json({
      message: "Thêm thành công"
    });
  } catch (err) {
    res.json({
      message: err
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