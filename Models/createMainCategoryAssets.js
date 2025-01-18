const mongoose = require("mongoose");

const mainCategoryAssetsSchema = new mongoose.Schema(
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
    },
  },
  {
    timestamps: true,
  }
);

mainCategoryAssetsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "categoryAssets",
  });

  next();
});
const ImageURL = (doc) => {
  if (
    doc.image &&
    !doc.image.includes(`${process.env.BASE_URL}/mainCategoryAssets`)
  ) {
    const image = `${process.env.BASE_URL}/mainCategoryAssets/${doc.image}`;
    doc.image = image;
  }
};
mainCategoryAssetsSchema.post("init", (doc) => {
  ImageURL(doc);
});
mainCategoryAssetsSchema.post("save", (doc) => {
  ImageURL(doc);
});
const createMainCategoryAssetsModel = mongoose.model(
  "maincategoryassets",
  mainCategoryAssetsSchema
);
module.exports = createMainCategoryAssetsModel;