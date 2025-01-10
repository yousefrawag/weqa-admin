const mongoose = require("mongoose");

const categoryAssetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Assets Name required"],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: [true, "location is required"],
    },
    category: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: [true, "location is required"],
    }],
  },
  {
    timestamps: true,
  }
);

const createCategoryAssetsModel = mongoose.model(
  "maincategoryassets",
  categoryAssetsSchema
);
module.exports = createCategoryAssetsModel;
