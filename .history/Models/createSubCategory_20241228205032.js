const mongoose = require("mongoose");

const createSubC = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  }, // الإشارة إلى الفئة الأب
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }], // قائمة الفئات الفرعية
});
const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
