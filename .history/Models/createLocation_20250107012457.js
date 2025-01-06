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
    buildingcount: {
      type: Number,
      required: [
        function () {
          return this.kind === "indoor";
        },
        'The "buildingcount" field is required for indoor kind.',
      ],
    },
    floorscount: {
      type: Number,
      required: [
        function () {
          return this.kind === "indoor";
        },
        'The "floorscount" field is required for indoor kind.',
      ],
    },
    placenumber: {
      type: Number,
      required: [
        function () {
          return this.kind === "indoor";
        },
        'The "placenumber" field is required for indoor kind.',
      ],
    },
    placename: {
      type: String,
      required: [
        function () {
          return this.kind === "indoor";
        },
        'The "placename" field is required for indoor kind.',
      ],
    },
    roomnumber: {
      type: Number,
      required: [
        function () {
          return this.kind === "indoor";
        },
        'The "roomnumber" field is required for indoor kind.',
      ],
    },
    details: {
      type: String,
      required: [
        function () {
          return this.kind === "indoor";
        },
        'The "details" field is required for indoor kind.',
      ],
    },
  },
  { timestamps: true }
);
createLocation.pre(/^find/, function (next) {
  this.populate({
    path: "building",
    select: { location: 0 },
    populate: "levels",
  });

  next();
});
const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
