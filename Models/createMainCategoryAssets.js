const mongoose = require("mongoose");

const categoryAssetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Assets Name required"],
    },

    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assets",
        required: [true, "assets is required"],
      },
    ],
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
