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
      ref: "Building", // تأكد من تطابق الاسم مع نموذج `Building`
      required: [true, "Required Building ID"],
    },
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
  });

  next();
});

const createLocationModel = mongoose.model("Location", createLocation);
module.exports = createLocationModel;
