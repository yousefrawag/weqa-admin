const mongoose = require("mongoose");

const createNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  subCategories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
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
