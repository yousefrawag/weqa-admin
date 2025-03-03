const mongoose = require("mongoose");

const SubCategoryAssetsSchema = new mongoose.Schema(
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
    nestSubCategoryAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nestsubcategoryassets",
      },
    ],
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

SubCategoryAssetsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assets",
  }).populate({
    path:"nestSubCategoryAssets"
  });
  next();
});
const ImageURL = (doc) => {
  if (
    doc.image &&
    !doc.image.includes(`${process.env.BASE_URL}/subCategoryAssets`)
  ) {
    const image = `${process.env.BASE_URL}/subCategoryAssets/${doc.image}`;
    doc.image = image;
  }
};
SubCategoryAssetsSchema.post("init", (doc) => {
  ImageURL(doc);
});
SubCategoryAssetsSchema.post("save", (doc) => {
  ImageURL(doc);
});
const createSubCategoryAssetsModel = mongoose.model(
  "subcategoryassets",
  SubCategoryAssetsSchema
);
module.exports = createSubCategoryAssetsModel;