const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  levels: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "levels",
    required: true,
  },
  // children: [{ type: mongoose.Schema.Types.ObjectId, ref: "subCategory" }], // قائمة الفئات الفرعية
});
// createSubCategory.pre(/^find/, function (next) {
//   this.populate({
//     path: "levels",
//   }).populate("children");
//   next();
// });
const createSubCategoryModel = mongoose.model("subCategory", createSubCategory);
module.exports = createSubCategoryModel;
