const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },
  
  },
  { timestamps: true }
);

const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
