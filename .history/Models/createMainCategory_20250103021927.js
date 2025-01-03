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

createMainCategory.pre(/^find/, function (next) {
  this.populate({
    path: "categories",
    select: "name", 
    populate: {
      path: "subcategories", 
      select: "name nestSubCategory", 
     
    
    },
    populate: {
      path: "subnestsubcategories", 
      select: "name", 
    },
     populate: {
        path: "nestSubCategory", 
        select: "name", 
      },
  });

  next();
});

const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
