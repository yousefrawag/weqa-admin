const mongoose = require("mongoose");

const createFacility = new mongoose.Schema(
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

const createFacilityModel = mongoose.model("building", createFacility);
module.exports = createFacilityModel;
