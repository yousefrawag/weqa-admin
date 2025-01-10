const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "maincategoryassets" }],
});

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rooms: [roomSchema],
});

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sections: [sectionSchema],
});

const floorSchema = new mongoose.Schema({
  floorName: { type: String, required: true },
  areas: [areaSchema],
});

const createLocation = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Location"],
    },
    slug: {
      type: String,
    },
    kind: {
      type: String,
      enum: ["indoor", "outdoor"],
      default: "outdoor",
    },
    location: {
      longitude: {
        type: Number,
        required: [true, "Required Location longitude"],
      },
      latitude: {
        type: Number,
        required: [true, "Required Location latitude"],
      },
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building",
      required: [true, "Required Building ID"],
    },
    floors: [floorSchema],
  },
  { timestamps: true }
);
createLocation.pre(/^find/, function (next) {
  this.populate({
    path: "building",
    select: "name kind",
  });

  next();
});
const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
