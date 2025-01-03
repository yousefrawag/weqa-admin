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
    name: {

    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
