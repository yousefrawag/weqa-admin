const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },
    levels: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "levels",
      required: true,
    },
    building: [{ type: mongoose.Schema.Types.ObjectId, ref: "building" }],
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
