const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "underReview",
        "reviewed",
        "underDelete",
        "deleted",
        "underUpdate",
        "updated",
      ],
      default: "underReview",
    },
    continued: {
      type: String,
      enum: ["first", "second", "third", "fourth"],
      default: "fourth",
    },

    data: [],
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: [true, "employee is required"],
    },
    pdf: [
      {
        pdf: String,
        createdBy: {
          username: String,
          identity: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: [true, "Location is required"],
      },
    ],
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building",
      required: [true, "building is required"],
    },

    levelsModel: {
      type: String,
      enum: [
        "maincategoryassets",
        "categoryassets",
        "subcategoryassets",
        "nestsubcategoryassets",
      ],
      required: true,
    },
    subCategoryAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "levelsModel",
      },
    ],
  },
  {
    strict: false,
    timestamps: true,
  }
);

const createAssetsnModel = mongoose.model("assets", assetSchema);
module.exports = createAssetsnModel;
