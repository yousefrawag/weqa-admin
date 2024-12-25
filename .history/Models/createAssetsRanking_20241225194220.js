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
      required: true,
    },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
  },
  { timestamps: true }
);

const createAssetsRankingModel = mongoose.model("assetsRanking", createAssetsRanking);
module.exports = createAssetsRankingModel;
