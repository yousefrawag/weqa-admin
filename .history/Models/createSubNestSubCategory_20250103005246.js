const mongoose = require("mongoose");

const createSubNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  nestSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nestSubCategory",
    required: true,
  },
});

const createSubNestSubCategoryModel = mongoose.model(
  "subnestsubcategories",
  createSubNestSubCategory
);
module.exports = createSubNestSubCategoryModel;
