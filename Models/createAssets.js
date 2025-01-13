const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maincategoryassets",
      required: true,  // تأكد من أن الـ category تكون إلزامية
    },
    subCategory: [
      {
        name: { type: String, required: true },  // اسم الـ subCategory
        subCategoryItems: {
          type: Map,
          of: String,
          required: true,  // القيم ستكون Map من النوع String
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
