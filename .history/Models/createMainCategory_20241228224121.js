const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
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
        default: [null],
      },
    ],
  },
  { timestamps: true }
);
createMainCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
  });
  next();
});
const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
