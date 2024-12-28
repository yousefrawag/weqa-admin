const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createMainCategory = new mongoose.Schema(
   {
      name: {
        type: String,
        required: [true, "Required name category"],
      },
      parentCategory: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mainCategory",
          de
        },
      ],
    },
  { timestamps: true }
);
createMainCategory.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  })
  next();
});
const createMainCategoryModel = mongoose.model(
  "mainCategory",
  createMainCategory
);
module.exports = createMainCategoryModel;
