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

const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
