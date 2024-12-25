const mongoose = require("mongoose");
// الاماكن -المواقع المرتبطه بالمنشأت
const createAssetsRanking = new mongoose.Schema(
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

const createAssetsRankingModel = mongoose.model(
  "assetsRanking",
  createAssetsRanking
);
module.exports = createAssetsRankingModel;
