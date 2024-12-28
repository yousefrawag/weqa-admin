const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name MainCategory"],
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
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
createCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
  });
  next();
});

const createCategoryModel = mongoose.model("category", createCategory);
module.exports = createCategoryModel;
