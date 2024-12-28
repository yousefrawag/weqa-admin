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

createCategory.pre(/^findOne/, function (next) {
  // عند استدعاء find()، يتم populate الحقول
  this.populate('maincategories', 'name') // populate حقل maincategories
      .populate({
        path: 'subcategories', // populate حقل subcategories
        select: 'name', // تحديد الحقول المترابطة التي نريد استرجاعها
      });
  next(); // استكمال العملية
});
const createCategoryModel = mongoose.model("categories", createCategory);
module.exports = createCategoryModel;
