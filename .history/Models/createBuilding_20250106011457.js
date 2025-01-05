const mongoose = require("mongoose");
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Building"],
    },
    slug: {
      type: String,
    },
    kind: {
      type: String,
      required: [true, "Required Kind Building"],
    },

    levels: {
      type: mongoose.Schema.Types.ObjectId,
    },

    continued: {
      type: String,
      enum: ["first", "second", "third", "fourth", "fifth"],
      required: [true, "Required Continued Building"],
      default: "first",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",

    },
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
  }).populate({ path: "building", select: "name kind continued" });

  next();
});
const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
