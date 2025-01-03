const mongoose = require("mongoose");
const createMainCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name mainCategory"],
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

createLectures.pre(/^find/, function (next) {
  this.populate({
    path: "section",
    select: "name",
  });

  next();
});
const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
