const mongoose = require("mongoose");

const SubCategoryAssetsSchema = new mongoose.Schema(
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

    categoryAssets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryassets",
      required: [true, "categoryAssets is required"],
    },
    assets: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assets",
    },
  },
  {
    timestamps: true,
  }
);
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