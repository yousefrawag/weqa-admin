const mongoose = require("mongoose");
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name mainCategory"],
    },
    slug: {
      type: String,
    },
    kind: String,
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building",
    },
  },
  { timestamps: true }
);



const createMainCategoryModel = mongoose.model(
  "maincategories",
  createMainCategory
);
module.exports = createMainCategoryModel;
