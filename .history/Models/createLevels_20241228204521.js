const mongoose = require("mongoose");

const createLevels = new mongoose.Schema({
  name: { type: String, required: true }, // اسم الفئة أو الفرعية
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    default: null,
    required:true
  }, // الإشارة إلى الفئة الأب
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }], // قائمة الفئات الفرعية
});
const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
