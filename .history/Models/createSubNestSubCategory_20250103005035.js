const mongoose = require("mongoose");

const createNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  nestSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nestSubCategory",
    required: true,
  },
 
});

const createNestSubCategoryModel = mongoose.model(
  "nestSubCategory",
  createNestSubCategory
);
module.exports = createNestSubCategoryModel;
