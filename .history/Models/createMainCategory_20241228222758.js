const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createMainCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name MainCategory"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
  },
  { timestamps: true }
);
createMainCategory.pre(/^find/, function (next) {
  this.populate({
    path: "children",
  })
  next();
});
const createMainCategoryModel = mongoose.model(
  "mainCategory",
  createMainCategory
);
module.exports = createMainCategoryModel;
