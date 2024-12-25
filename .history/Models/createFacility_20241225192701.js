const mongoose = require("mongoose");

const createFacility = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },
    levels: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "facility",
      required: true,
    },
    Facility: [{ type: mongoose.Schema.Types.ObjectId, ref: "facility" }],
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
  },
  { timestamps: true }
);

const createFacilityModel = mongoose.model("facility", createFacility);
module.exports = createFacilityModel;
