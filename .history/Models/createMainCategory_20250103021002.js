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
  //     path: "categories", // أولاً نملأ حقل categories
//     populate: {
//       path: "subcategories",
//       select: "name",
//     },
  });

  next();
});
const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
