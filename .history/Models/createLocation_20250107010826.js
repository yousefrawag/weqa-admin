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
      default: "outdoor",
    },
    location: {
      longitude: {
        type: Number,
        required: [true, "Required Location longitude"],
      },
      latitude: {
        type: Number,
        required: [true, "Required Location latitude"],
      },
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
    buildingcount:Number,
    placenumber: {
      type: Number,
      default: function () {
        return Math.floor(100000 + Math.random() * 900000);
      },
    },
  },
  { timestamps: true } 
);
createLocation.pre(/^find/, function (next) {
  this.populate({
    path: "building",
    select: { location: 0 },
  });

  next();
});
const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
