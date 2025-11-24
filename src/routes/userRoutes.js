const express = require("express");
const router = express.Router();

const { getUsers, createUser,deleteUser,updateUser} = require("../controllers/userController");
router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);


module.exports = router;