const mongoose = require("mongoose");

const createuilding = new mongoose.Schema(
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
    uilding: [{ type: mongoose.Schema.Types.ObjectId, ref: "uilding" }],
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
  },
  { timestamps: true }
);

const createFacilityModel = mongoose.model("uilding", createFacility);
module.exports = createFacilityModel;
