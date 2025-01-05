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

    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },


    kind: {
      type: String,
      enum: ["indoor", "outdoor"],
      required: [true, "Required Kind Building"],
      default: "indoor",
    },
  },
  { timestamps: true }
);

const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
