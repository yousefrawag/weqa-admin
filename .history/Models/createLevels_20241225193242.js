const mongoose = require("mongoose");

const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },

    building: [{ type: mongoose.Schema.Types.ObjectId, ref: "building" }],
  },
  { timestamps: true }
);

const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
