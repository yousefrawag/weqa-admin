const mongoose = require("mongoose");

const createNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  nestSubCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nestsubcategories",
      default: [],
    },
  ], // قائمة الفئات الفرعية
});
createNestSubCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
  });
  next();
});
const createNestSubCategoryModel = mongoose.model(
  "nestsubcategories",
  createNestSubCategory
);
module.exports = createNestSubCategoryModel;
