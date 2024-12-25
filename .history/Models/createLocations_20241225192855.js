const mongoose = require("mongoose");

const createLocation = new mongoose.Schema(
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
    facility: [{ type: mongoose.Schema.Types.ObjectId, ref: "facility" }],
    hospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
  },
  { timestamps: true }
);

const createLocationModel = mongoose.model("Location", createLocation);
module.exports = createLocationModel;
