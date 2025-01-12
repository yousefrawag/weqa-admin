const { default: mongoose } = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() {
      return new mongoose.Types.ObjectId();  // استخدام new لإنشاء ObjectId
    }
  },
});

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() {
      return new mongoose.Types.ObjectId();  // استخدام new لإنشاء ObjectId
    }
  },
  rooms: [roomSchema],
});

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() {
      return new mongoose.Types.ObjectId();  // استخدام new لإنشاء ObjectId
    }
  },
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

const createLocationModel = mongoose.model("location", createLocation);
module.exports = createLocationModel;
