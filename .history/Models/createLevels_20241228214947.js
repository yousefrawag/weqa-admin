const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name levels"],
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
    ], // قائمة الفئات الفرعية
  },
  { timestamps: true }
);
createLevels.pre(/^find/, function (next) {
  this.populate({
    path: "category",
  }).populate("children");
  next();
});
const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
