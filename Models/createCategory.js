const mongoose = require("mongoose");
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name MainCategory"],
    },
    slug: {
      type: String,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building",
      required: false, // Make it optional
    },
    
  
    maincategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maincategories",
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
      },
    ],
  },
  { timestamps: true }
);
createCategory.pre(/^find/, function (next) {
  this.populate({
    path: "subcategories",
    select: "name",
    populate: {
      path: "nestSubCategory",
      select: "name subnestsubcategories",
      populate: {
        path: "subnestsubcategories",
        select: "name",
      },
    },
  }).populate({ path: "building", select: "name kind continued" });

  next();
});

const createCategoryModel = mongoose.model("categories", createCategory);
module.exports = createCategoryModel;
