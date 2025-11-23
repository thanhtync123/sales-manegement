const express = require("express");
const router = express.Router();

const { getUsers, getUser } = require("../controllers/userController");

router.get("/users", getUsers);

module.exports = router;