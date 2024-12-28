const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createMainCategory = new mongoose.Schema(
   {
      name: {
        type: String,
        required: [true, "Required name category"],
      },
      category: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category",
          default: null,
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
