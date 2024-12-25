const mongoose = require("mongoose");

const createPlaces = new mongoose.Schema(
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
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
  },
  { timestamps: true }
);

const createLocationModel = mongoose.model("Location", createLocation);
module.exports = createLocationModel;
