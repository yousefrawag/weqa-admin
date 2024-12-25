const mongoose = require("mongoose");
// الاماكن -المواقع المرتبطه بالمنشأت
const createassetsRanking = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const createPlacesModel = mongoose.model("assetsRanking", createPlaces);
module.exports = createPlacesModel;
