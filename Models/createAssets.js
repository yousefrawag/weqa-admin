const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "reject", "fulfilled"],
      default: "pending",
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
      enum: ["maincategoryassets", "categoryassets", "subcategoryassets"],
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
assetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createBy",
  });

  next();
});

const createAssetsnModel = mongoose.model("assets", assetSchema);
module.exports = createAssetsnModel;
