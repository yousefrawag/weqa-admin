const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  nestSubCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "nestsubcategories", default: [] },
  ], // قائمة الفئات الفرعية
});

const createSubCategoryModel = mongoose.model(
  "subcategories",
  createSubCategory
);
module.exports = createSubCategoryModel;
