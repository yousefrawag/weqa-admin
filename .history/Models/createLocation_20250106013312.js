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
      longitude: {tNumber},
      latitude: Number,
      
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
    placenumber: {
      type: Number,
      default: function () {
        return Math.floor(100000 + Math.random() * 900000);
      }
    },
  },
  { timestamps: true }
);

const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
