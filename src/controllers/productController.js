const { sequelize } = require("../config/db");
const { QueryTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

async function getProducts(req, res) {
  try {
    const query = `
    SELECT p.id, p.name, c.name as category_id, p.sku, p.price, p.stock, p.image, p.description
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
    const { name, category, sku, price, stock, description } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : `/images/defaultimg.png`;

const query = `
  INSERT INTO Products 
  (name, category_id, sku, price, stock, image, description)
  VALUES (:name, :category, :sku, :price, :stock, :image, :description)
`;

await sequelize.query(query, {
  replacements: {
    name,
    category,
    sku,
    price,
    stock,
    image: imagePath,   // bind imagePath ở đây
    description
  },
  type: QueryTypes.INSERT
});


    res.json({ message: "Thêm thành công" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}


async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const selectQuery = `SELECT image FROM Products WHERE id = :id`;
    const result = await sequelize.query(selectQuery, {
      replacements: { id },
      type: QueryTypes.SELECT
    });

    if (result.length > 0 && result[0].image) {

      const filePath = path.join(__dirname, "../../public/images", result[0].image.replace("/images/", ""));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const deleteQuery = `DELETE FROM Products WHERE id = :id`;
    await sequelize.query(deleteQuery, {
      replacements: { id },
      type: QueryTypes.DELETE
    });

    res.json({ message: "Xóa thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
async function updateProduct(req, res) {
  try {
    const { name, category, sku, price, stock, description } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    if (imagePath) {
      const selectQuery = `SELECT image FROM Products WHERE id = :id`;
      const result = await sequelize.query(selectQuery, {
        replacements: { id: req.params.id },
        type: QueryTypes.SELECT
      });

      if (result.length > 0 && result[0].image && result[0].image !== '/images/defaultimg.png') {
        const oldFilePath = path.join(__dirname, "../../public/images", result[0].image.replace("/images/", ""));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Cập nhật dữ liệu
    const updateQuery = imagePath ? `
      UPDATE products
      SET name = :name,
          category_id = :category,
          sku = :sku,
          price = :price,
          stock = :stock,
          description = :description,
          image = :image
      WHERE id = :id
    ` : `
      UPDATE products
      SET name = :name,
          category_id = :category,
          sku = :sku,
          price = :price,
          stock = :stock,
          description = :description
      WHERE id = :id
    `;

    await sequelize.query(updateQuery, {
      replacements: {
        id: req.params.id,
        name,
        category,
        sku,
        price,
        stock,
        description,
        image: imagePath
      },
      type: QueryTypes.UPDATE
    });

    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}



module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct


};