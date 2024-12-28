const mongoose = require("mongoose");
//المباني المرتبطه بمستويات المنصه
const createCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Required name MainCategory"],
    },
    maincategories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maincategories",
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategories",
      },
    ],
  },
  { timestamps: true }
);
mongoose.set("strictPopulate", false);

createCategorySchema.pre(/^find/, async function (next) {
  try {
    // قم باستخدام await للتأكد من أن العملية تكتمل أولاً قبل متابعة الأخرى
    await this.populate('maincategories', 'name')
        .populate('subcategories', 'name');
    next();
  } catch (error) {
    next(error); // معاملة الأخطاء في حالة حدوثها
  }
});


const createCategoryModel = mongoose.model("categories", createCategory);
module.exports = createCategoryModel;
