const mongoose = require("mongoose");

// 1 - Create a Schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required"],
      index: true,
      unique: true,
      minLength: [3, "Too short category name"],
      maxLength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true, // Always convert `test` to lowercase
    },
    image: {
      type: String,
    },
  },
  { timeseries: true }
);

// 2- Create a Model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
