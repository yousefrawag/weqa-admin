const mongoose = require("mongoose");
const createBuilding = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name Building"],
    },
    slug: {
      type: String,
    },
    kind: {
      type: String,
      required: [true, "Required Kind Building"],
    },

    levels: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "levelsModel", // تحديد المرجع بناءً على الحقل levelsModel
    },
    levelsModel: {
      type: String,
      enum: [
        "maincategories",
        "categories",
        "subcategories",
        "nestsubcategories",
        "subnestsubcategories",
      ],
      required: true,
    },

    continued: {
      type: String,
      enum: ["first", "second", "third", "fourth", "fifth"],
      required: [true, "Required Continued Building"],
      default: "first",
    },
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "location",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
createBuilding.pre(/^find/, function (next) {
  // قم بتشغيل populate أولاً للحقول المطلوبة
  this.populate({
    path: "levels",
    model: this.levelsModel, // استخدام النموذج الديناميكي من levelsModel
  }).populate({
    path: "location",
  });

  // تأكد من استدعاء next بشكل صحيح لاستكمال الطلب
  next();
});


const createBuildingModel = mongoose.model("building", createBuilding);
module.exports = createBuildingModel;
