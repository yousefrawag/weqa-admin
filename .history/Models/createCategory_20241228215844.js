const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name category"],
    },
    levels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "levels",
      },
    ],
  },
  { timestamps: true }
);
createCategory.pre(/^find/, function (next) {
  this.populate({
    path: "levels",
  });
  next();
});
const createCategoryModel = mongoose.model("category", createCategory);
module.exports = createCategoryModel;
