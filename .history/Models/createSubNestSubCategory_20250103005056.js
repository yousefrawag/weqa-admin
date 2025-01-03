const mongoose = require("mongoose");

const createSubNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  nestSubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nestSubCategory",
    required: true,
  },
 
});

const createSubNestSubCategory = mongoose.model(
  "nestsubcategories",
  createNestSubCategory
);
module.exports = createNestSubCategoryModel;
