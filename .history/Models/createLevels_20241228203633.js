const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name levels"],
    },
  },
  { timestamps: true }
);




const createLevels = new mongoose.Schema({
  name: { type: String, required: true }, // اسم الفئة أو الفرعية
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // الإشارة إلى الفئة الأب
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] // قائمة الفئات الفرعية
});


