const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// serve public under /public (-> access http://localhost:3000/public/)
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/admin", express.static(path.join(__dirname, "../admin")));
app.get("/", (req, res) => {
  res.send("API Sales Management Running...");
});

const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

module.exports = app;
