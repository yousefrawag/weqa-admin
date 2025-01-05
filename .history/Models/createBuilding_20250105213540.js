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
  
    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },

    kind: {
      type: String,
      enum: ["indoor", "outdoor"],
      required: [true, "Required Kind Building"],
      default: "indoor",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
    },
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
