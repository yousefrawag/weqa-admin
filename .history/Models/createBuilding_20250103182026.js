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



const createBuildingModel = mongoose.model(
  "maincategories",
  createBuilding
);
module.exports = createBuildingModel;
