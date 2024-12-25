const mongoose = require("mongoose");
// الاماكن -المواقع المرتبطه بالمنشأت
const createPlaces = new mongoose.Schema(
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

const createPlacesModel = mongoose.model("assets", createPlaces);
module.exports = createPlacesModel;
