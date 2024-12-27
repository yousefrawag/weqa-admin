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

const createLevelsModel = mongoose.model("building", createLevels);
module.exports = createLevelsModel;
