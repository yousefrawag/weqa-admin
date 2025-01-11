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
    assets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "assets",
      required: [true, "assets is required"],
    }],
  },
  {
    timestamps: true,
  }
);
categoryAssetsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assets",
    select: "name"
  });

  next();
});
const createCategoryAssetsModel = mongoose.model(
  "maincategoryassets",
  categoryAssetsSchema
);
module.exports = createCategoryAssetsModel;
