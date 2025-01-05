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
      enum: ["first", "second", "third", "fourth", "fifth"],
      required: [true, "Required Continued Building"],
      default: "first",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Required Kind Building"],
    },
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("location", createBuilding);
module.exports = createBuildingModel;
