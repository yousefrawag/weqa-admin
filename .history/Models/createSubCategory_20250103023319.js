const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  nestSubCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "nestsubcategories", default: [] },
  ], // قائمة الفئات الفرعية
});

createCategory.pre(/^find/, function (next) {
  this.populate({
    path: "subcategories",
    select: "name",
    populate: {
      path: "nestSubCategory",
      select: "name subnestsubcategories",
      populate: {
        path: "subnestsubcategories",
        select: "name",
      },
    },
  });

  next();
});
const createSubCategoryModel = mongoose.model(
  "subcategories",
  createSubCategory
);
module.exports = createSubCategoryModel;
