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
    select: "name", 
    populate: {
      path: "subcategories", 
      select: "name nestSubCategory", 
      populate: {
        path: "nestSubCategory", 
        select: "name", 
      },
      populate: {
        path: "subnestsubcategories", 
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
