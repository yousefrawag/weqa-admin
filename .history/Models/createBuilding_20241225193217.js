const mongoose = require("mongoose");

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
    Building: [{ type: mongoose.Schema.Types.ObjectId, ref: "Building" }],
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
  },
  { timestamps: true }
);

const createFacilityModel = mongoose.model("Building", createFacility);
module.exports = createFacilityModel;
