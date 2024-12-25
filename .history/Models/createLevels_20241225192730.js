const mongoose = require("mongoose");

const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },

    facility: [{ type: mongoose.Schema.Types.ObjectId, ref: "facility" }],
  },
  { timestamps: true }
);

const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
