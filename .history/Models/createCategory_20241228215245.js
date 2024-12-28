const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name category"],
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
  },
  { timestamps: true }
);

const createCategoryModel = mongoose.model("category", createCategory);
module.exports = createCategoryModel;
