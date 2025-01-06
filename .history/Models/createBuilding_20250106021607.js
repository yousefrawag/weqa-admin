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
        ref: "Location", // تأكد من تطابق الاسم مع النموذج
        default: [],
      },
    ],
  },
  { timestamps: true }
);

createBuilding.pre(/^find/, function (next) {
  this.populate({
    path: "levels",
    model: this.levelsModel, // استخدام النموذج الديناميكي
  }).populate({
    path: "location",
    select: "name location", // اختيار الحقول المطلوبة فقط
  });

  next();
});

const createBuildingModel = mongoose.model("Building", createBuilding);
module.exports = createBuildingModel;
