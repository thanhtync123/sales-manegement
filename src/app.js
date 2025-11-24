const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/admin", express.static(path.join(__dirname, "../admin")));
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.get("/", (req, res) => {
  res.send("API Sales Management Running...");
});

const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api", categoryRoutes);

module.exports = app;
