const mongoose = require("mongoose");

const categoryAssetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Assets Name required"],
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assets",
        default: null,
      },
    ],
    subCategoryAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategoryassets",
      },
    ],
    mainCategoryAssets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maincategoryassets",
    },
  },
  {
    timestamps: true,
  }
);

categoryAssetsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "subCategoryAssets",
  }).populate("assets");

  next();
});
const ImageURL = (doc) => {
  if (
    doc.image &&
    !doc.image.includes(`${process.env.BASE_URL}/categoryAssets`)
  ) {
    const image = `${process.env.BASE_URL}/categoryAssets/${doc.image}`;
    doc.image = image;
  }
};
categoryAssetsSchema.post("init", (doc) => {
  ImageURL(doc);
});
categoryAssetsSchema.post("save", (doc) => {
  ImageURL(doc);
});
const createCategoryAssetsModel = mongoose.model(
  "categoryassets",
  categoryAssetsSchema
);
module.exports = createCategoryAssetsModel;
