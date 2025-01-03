const mongoose = require("mongoose");
const createMainCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name mainCategory"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

createMainCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
    select: "name", // ملء حقل categories
    populate: {
      path: "subcategories", // ملء حقل subcategories داخل categories
      select: "name nestSubCategory", // اختيار الحقول المطلوبة فقط
      populate: {
        path: "nestSubCategory", // ملء nestSubCategory داخل subcategories
        select: "name", // اختيار الحقول المطلوبة فقط من nestSubCategory
      },
      populate: {
        path: "subnestsubcategories", // ملء nestSubCategory داخل subcategories
        select: "name", // اختيار الحقول المطلوبة فقط من nestSubCategory
      },
    },
  });

  next();
});

const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
