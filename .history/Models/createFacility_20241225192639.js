const mongoose = require("mongoose");

const createFacility = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },
    ministry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ministry",
      required: true,
    },
    Facility: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facility" }],
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
  },
  { timestamps: true }
);

const createFacilityModel = mongoose.model("facility", createFacility);
module.exports = createFacilityModel;
