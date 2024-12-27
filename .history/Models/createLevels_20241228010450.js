const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Building"],
    },
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createLevels);
module.exports = createBuildingModel;
