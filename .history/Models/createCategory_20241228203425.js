const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name levels"],
    },
  },
  { timestamps: true }
);

const createCategoryModel = mongoose.model("levels", createCategory);
module.exports = createCategoryModel;
