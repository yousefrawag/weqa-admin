const mongoose = require("mongoose");

const createSubNestSubCategory = new mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
  },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "building",
  },
  nestsubcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nestsubcategory",
    required: true,
  },
})
createSubCategory
  .pre(/^find/, function (next) {
    this.populate({
      path: "nestSubCategory",
      select: "name",
      populate: {
        path: "subnestsubcategories",
        select: "name",
      },
    }).populate({ path: "building", select: "name kind continued" });

    next();
  })

const createSubNestSubCategoryModel = mongoose.model(
  "subnestsubcategories",
  createSubNestSubCategory
);
module.exports = createSubNestSubCategoryModel;
