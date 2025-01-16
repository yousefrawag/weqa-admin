const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      required: [true, "location is required"],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Room is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maincategoryassets",
      required: true,
    },
    subCategory: [
      {
        name: { type: String, required: true },
        subCategoryItems: {
          type: Map,
          of: new mongoose.Schema({
            _id: {
              type: mongoose.Schema.Types.ObjectId,
              default: () => new mongoose.Types.ObjectId(), // إنشاء _id فريد تلقائيًا
            },
            name: {
              type: String,
              required: true,
            },
          }),
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const createAssetsnModel = mongoose.model("assets", assetSchema);
module.exports = createAssetsnModel;
