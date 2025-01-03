const mongoose = require("mongoose");

const createNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  nestNestSubCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "nestsubcategories", default: [] },
  ], // قائمة الفئات الفرعية
});
createNestSubCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
  });
  next();
});
const createNestSubCategoryModel = mongoose.model(
  "subcategories",
  createNestSubCategory
);
module.exports = createNestSubCategoryModel;
