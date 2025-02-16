const mongoose = require("mongoose");

const nestSubCategoryAssetsSchema = new mongoose.Schema(
  {
    data: [],

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
  },
  {
    timestamps: true,
  }
);

nestSubCategoryAssetsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assets",
    populate: {
      path: "building",
    },
    populate: {
      path: "location",
    },
  });

  next();
});

const ImageURL = (doc) => {
  if (
    doc.image &&
    !doc.image.includes(`${process.env.BASE_URL}/nestSubCategoryAssets`)
  ) {
    const image = `${process.env.BASE_URL}/nestSubCategoryAssets/${doc.image}`;
    doc.image = image;
  }
};
nestSubCategoryAssetsSchema.post("init", (doc) => {
  ImageURL(doc);
});
nestSubCategoryAssetsSchema.post("save", (doc) => {
  ImageURL(doc);
});
const createnestSubCategoryAssetsModel = mongoose.model(
  "nestsubcategoryassets",
  nestSubCategoryAssetsSchema
);
module.exports = createnestSubCategoryAssetsModel;
