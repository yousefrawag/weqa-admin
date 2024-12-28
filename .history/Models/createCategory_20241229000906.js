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
    // تنفيذ populate بشكل غير متزامن
    await this.populate('maincategories', 'name')
        .populate({
          path: 'subcategories',
          select: 'name',
        });
    next(); // استدعاء next() بعد تكملة العملية
  } catch (error) {
    next(error); // معالجة الأخطاء إذا حدثت
  }
});

const createCategoryModel = mongoose.model("categories", createCategory);
module.exports = createCategoryModel;
