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

createCategory.pre(/^find/, async function (next) {
  try {
    // أولاً نقوم بـ populate لجميع الحقول المطلوبة
    this.populate({
      path: "subcategories",
    })
    
    // انتظار اكتمال populate قبل الانتقال
    await next();
  } catch (error) {
    next(error);  // التعامل مع الأخطاء بشكل صحيح
  }
});


const createCategoryModel = mongoose.model("categories", createCategory);
module.exports = createCategoryModel;
