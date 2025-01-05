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
      required: [true, "Required Kind Location"],
    },

    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },

    continued: {
      type: String,
      enum: ["first", "second", "third", "fourth", "fifth"],
      required: [true, "Required Continued Location"],
      default: "first",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Required Kind Location"],
    },
  },
  { timestamps: true }
);

const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
