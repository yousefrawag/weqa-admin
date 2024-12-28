const mongoose = require("mongoose");

const createSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  levels: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "levels",
    default: null,
  }, // الإشارة إلى الفئة الأب
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "levels" }], // قائمة الفئات الفرعية
});
const createSubCategoryModel = mongoose.model("subCategory", createSubCategory);
module.exports = createSubCategoryModel;
