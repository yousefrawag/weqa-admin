const mongoose = require("mongoose");

const createLevels = new mongoose.Schema({
  name: { type: String, required: true }, // اسم الفئة أو الفرعية
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }, // الإشارة إلى الفئة الأب
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // قائمة الفئات الفرعية
});
const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
