const mongoose = require("mongoose");
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Building"],
    },
    slug: {
      type: String,
    },
    kind: {
      type: String,
      required: [true, "Required Kind Building"],
    },

    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },
    continued: {
      type: String,
      enum: [
        "first", //مالك المنصة
        "second", //مدير المنصة
        "third", //مدير المنشأة
        "fourth", //مدير السلامة
        "fifth", //مدير الامن
      ]
      default:first
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
