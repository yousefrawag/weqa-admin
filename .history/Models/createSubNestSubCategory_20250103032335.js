const mongoose = require("mongoose");

const createSubNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
  },
  nestsubcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nestsubcategory",
    required: true,
  },
});

const createSubNestSubCategoryModel = mongoose.model(
  "subnestsubcategories",
  createSubNestSubCategory
);
module.exports = createSubNestSubCategoryModel;
