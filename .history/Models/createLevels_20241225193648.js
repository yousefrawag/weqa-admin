const mongoose = require("mongoose");
// مستويات المنصه
const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },

    building: [{ type: mongoose.Schema.Types.ObjectId, ref: "building" }], // المباني المرتبطه
  },
  { timestamps: true }
);

const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
