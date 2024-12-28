const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "subcategories" }], // قائمة الفئات الفرعية
});
createSubCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
  });
  next();
});
const createSubCategoryModel = mongoose.model(
  "subcategories",
  createSubCategory
);
module.exports = createSubCategoryModel;
