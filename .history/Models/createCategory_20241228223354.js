const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name category"],
    },
    parentCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mainCategory",
      },
    ],
  },
  { timestamps: true }
);
createCategory.pre(/^find/, function (next) {
  this.populate({
    path: "parentCategory",
  });
  next();
});

const createCategoryModel = mongoose.model("category", createCategory);
module.exports = createCategoryModel;
