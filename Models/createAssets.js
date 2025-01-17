const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    building:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "building", // يجب أن يكون اسم الموديل المرتبط هنا
    }],
  },
  {
    strict: false, // يسمح بإضافة بيانات غير محددة
    timestamps: true, // يضيف حقول createdAt و updatedAt تلقائيًا
  }
);

assetSchema.pre(/^find/, function (next) {
  this.populate({
    path: "building",
    select: "-location",
    populate:"levels"
  });

  next();
});
const ImageURL = (doc) => {
  if (
    doc.image &&
    !doc.image.includes(`${process.env.BASE_URL}/assets`)
  ) {
    const image = `${process.env.BASE_URL}/assets/${doc.image}`;
    doc.image = image;
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
