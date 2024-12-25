const mongoose = require("mongoose");
//تصنيفات الاصول التابعه لموقع تابع لمنشأه
const createAssetsRanking = new mongoose.Schema(
  {
    levelsname: {
      type: String,
      required: [true, "Required name Category"], // اسم التصنيف -اسم المستوي
    },
    levels: { //التصنيف الرئيسي في حاله كاتن مستوي فرعي
      type: mongoose.Schema.Types.ObjectId,
      ref: "levels",
    },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
    building: [{ type: mongoose.Schema.Types.ObjectId, ref: "building" }],
  },
  { timestamps: true }
);

const createAssetsRankingModel = mongoose.model(
  "assetsRanking",
  createAssetsRanking
);
module.exports = createAssetsRankingModel;
