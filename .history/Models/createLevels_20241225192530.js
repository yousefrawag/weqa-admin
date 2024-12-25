const mongoose = require("mongoose");

const createLevels = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },

    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "department" }],
  },
  { timestamps: true }
);

const createLevelsModel = mongoose.model("levels", createLevels);
module.exports = createLevelsModel;
