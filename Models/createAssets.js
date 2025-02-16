const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["pending", "reject", "fulfilled"],
      default: "pending",
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
        pdf: String, // Store the file path or URL
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "employee", // Reference to the employee who uploaded the file
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now, // Automatically set the upload timestamp
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
assetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createBy",
  }).populate({
    path: "pdf.createdBy", // Populate the createdBy field inside the pdf array
  });

  next();
});


const createAssetsnModel = mongoose.model("assets", assetSchema);
module.exports = createAssetsnModel;
