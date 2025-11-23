const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Sales Management Running...");
});

const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);

module.exports = app;
