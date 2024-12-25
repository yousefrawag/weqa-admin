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
    facility: [{ type: mongoose.Schema.Types.ObjectId, ref: "facility" }],
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "places" }],
  },
  { timestamps: true }
);

const createPlacesModel = mongoose.model("Location", createPlaces);
module.exports = createPlacesModel;
