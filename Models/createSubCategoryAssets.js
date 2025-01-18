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

    assets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assets",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// SubCategoryAssetsSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "assets",
//   });

//   next();
// });
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
