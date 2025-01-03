const mongoose = require("mongoose");
const createMainCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name mainCategory"],
    },
    slug: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        default: [],
      },
    ],
    building: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "building",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

createMainCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
    select: "name",
    populate: {
      path: "subcategories",
      select: "name nestSubCategory",
      populate: {
        path: "nestSubCategory",
        select: "name subnestsubcategories",
        populate: {
          path: "subnestsubcategories",
          select: "name",
        },
      },
    },
  });

  next();
});

const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
