const mongoose = require("mongoose");
//تصنيفات الاصول التابعه لموقع تابع لمنشأه
const createAssets = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Category"],
    },
    levels: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "levels",
    },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
    building: [{ type: mongoose.Schema.Types.ObjectId, ref: "building" }],
  },
  { timestamps: true }
);

const createAssetsModel = mongoose.model("assets", createAssets);
module.exports = createAssetsModel;
// 