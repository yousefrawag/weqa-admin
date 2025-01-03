const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
  },
   building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "building",
      },
  categories: {
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

createSubCategory.pre(/^find/, function (next) {
  this.populate({
    path: "nestSubCategory",
    select: "name",
    populate: {
      path: "subnestsubcategories",
      select: "name",
    },
  });

  next();
}).populate({path:"building",select: "name kind continued"});
const createSubCategoryModel = mongoose.model(
  "subcategories",
  createSubCategory
);
module.exports = createSubCategoryModel;
