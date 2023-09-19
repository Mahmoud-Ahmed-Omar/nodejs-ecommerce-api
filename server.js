const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_DB)
  .then((connection) => {
    console.log(`Database Connected ${connection.connection.host}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// 1 - Create a Schema
const CategorySchema = new mongoose.Schema({
  name: String,
});

// 2- Create a Model
const CategoryModel = mongoose.model("Category", CategorySchema);

app.get("/", (req, res) => {
  res.send("First API");
});

app.post("/", (req, res) => {
  const name = req.body.name;
  const Category = new CategoryModel({ name });
  Category.save()
    .then((document) => {
      res.json(document);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`App Running on port ${process.env.PORT}`);
});
