const mongoose = require("mongoose");
const createLocation = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Location"],
    },
    slug: {
      type: String,
    },
    kind: {
      type: String,
      enum: ["indoor", "outdoor"],
      default: "indoor",
    },
    location: {
      longitude: Number , 
      latitude: Number,
      required: [true, "Required Location coordinates"],
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building",
      required: [true, "Required Building ID"],
    },

    kind: {
      type: String,
      enum: ["indoor", "outdoor"],
      default: "indoor",
    },
  },
  { timestamps: true }
);

const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
