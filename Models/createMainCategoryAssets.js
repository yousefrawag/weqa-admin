const mongoose = require("mongoose");

const selectedInputSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  selectedOptions: {
    type: [String], // Array of selected options for select fields
    default: [],
  },
});

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
    selectedInputs: [selectedInputSchema], // Array of selected inputs
    categoryAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryassets",
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

mainCategoryAssetsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "categoryAssets",
  }).populate("assets");

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