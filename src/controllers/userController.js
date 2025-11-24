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
async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const query = `INSERT INTO users (name, email, password, role) 
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
async function deleteUser(req, res) {
  try {
    const query = `DELETE FROM users WHERE (id = '${req.params.id}')`;
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
async function updateUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const query = `UPDATE users SET name = '${name}', email = '${email}', password = '${password}', role = '${role}' 
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
  getUsers,
  createUser,
  deleteUser,
  updateUser

};