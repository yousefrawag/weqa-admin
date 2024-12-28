const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mainCategory",
    required: true,
  },
  // children: [{ type: mongoose.Schema.Types.ObjectId, ref: "subCategory" }], // قائمة الفئات الفرعية
});
createSubCategory.pre(/^find/, function (next) {
  this.populate({
    path: "maincategories",
  });
  next();
});
const createSubCategoryModel = mongoose.model("subcategories", createSubCategory);
module.exports = createSubCategoryModel;
