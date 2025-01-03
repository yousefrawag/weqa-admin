const mongoose = require("mongoose");

const createNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
    required: true,
  },
  subnestsubcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subnestsubcategories",
      default: [],
    },
  ], // قائمة الفئات الفرعية
});

const createNestSubCategoryModel = mongoose.model(
  "nestsubcategories",
  createNestSubCategory
);
module.exports = createNestSubCategoryModel;
