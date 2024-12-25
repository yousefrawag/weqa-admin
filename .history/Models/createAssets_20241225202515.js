const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assetsType: { type: String, required: true },
  levels: { //hgh
    type: mongoose.Schema.Types.ObjectId,
    ref: "levels",
  },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "levels",
  },
  place: {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "place",
    },
    floor: { type: String, required: true },
    room: { type: String, required: false },
  },
  financialDetails: {
    supplier: { type: String },
    manufacturer: { type: String },
    value: { type: Number },
    purchaseDate: { type: Date },
  },
  operationalDetails: {
    lastMaintenance: { type: Date },
    nextMaintenance: { type: Date },
    safetyNotes: { type: String },
  },
  attachments: [
    {
      fileName: { type: String },
      uploadedBy: { type: String },
      uploadedAt: { type: Date, default: Date.now },
      notes: { type: String },
    },
  ],
});

module.exports = mongoose.model("Asset", assetSchema);
