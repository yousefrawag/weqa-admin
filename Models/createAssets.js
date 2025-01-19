const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        required: [true, "Location is required"],
      },
    ],
    subCategoryAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategoryassets", // يجب أن يكون اسم الموديل المرتبط هنا
      },
    ],
  },
  {
    strict: false,
    timestamps: true,
  }
);

const ImageURL = (doc) => {
  if (doc.pdf && !doc.pdf.includes(`${process.env.BASE_URL}/assets`)) {
    const pdf = `${process.env.BASE_URL}/assets/${doc.pdf}`;
    doc.pdf = pdf;
  }
};
assetSchema.post("init", (doc) => {
  ImageURL(doc);
});
assetSchema.post("save", (doc) => {
  ImageURL(doc);
});
const createAssetsnModel = mongoose.model("assets", assetSchema);
module.exports = createAssetsnModel;